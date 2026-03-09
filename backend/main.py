from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import qrcode
from io import BytesIO
import base64
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
import os

app = FastAPI()

# Data Models
class User(BaseModel):
    full_name: str
    email: str
    selected_days: List[str]

class Seat(BaseModel):
    id: str
    row: int
    col: int
    block: str
    status: str
    reserved_by: Optional[User] = None

class ReservationRequest(BaseModel):
    seat_id: str
    user: User

# In-memory storage
seats: List[Seat] = []

def init_seats():
    global seats
    seats = []
    for r in range(1, 9):
        for c in range(1, 6):
            status = "vip" if r <= 2 else "available"
            seats.append(Seat(id=f"L-{r}-{c}", row=r, col=c, block="Left", status=status))
    
    for r in range(1, 9):
        for c in range(1, 6):
            status = "vip" if r <= 2 else "available"
            seats.append(Seat(id=f"R-{r}-{c}", row=r, col=c, block="Right", status=status))

init_seats()

# CORS
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/seats")
def get_seats():
    return seats

@app.post("/api/reserve")
def reserve_seat(req: ReservationRequest):
    seat = next((s for s in seats if s.id == req.seat_id), None)
    if not seat:
        raise HTTPException(status_code=404, detail="Seat not found")
    
    if seat.status != "available":
        raise HTTPException(status_code=400, detail="Seat not available")
    
    # Check for duplicate email
    for s in seats:
        if s.reserved_by and s.reserved_by.email == req.user.email:
            raise HTTPException(status_code=400, detail="Email already used for a reservation")

    seat.status = "reserved"
    seat.reserved_by = req.user
    return {"message": "Reservation successful", "seat": seat}

@app.post("/api/generate-ticket")
def generate_ticket(req: ReservationRequest):
    buffer = BytesIO()
    p = canvas.Canvas(buffer, pagesize=letter)
    
    # Add Logo if exists
    logo_path = os.path.join("..", "frontend", "public", "logo.png")
    if os.path.exists(logo_path):
        # Draw logo (x, y, width, height)
        try:
            p.drawImage(logo_path, 100, 750, width=50, height=50, preserveAspectRatio=True, mask='auto')
            title_y = 765
        except Exception:
             title_y = 750
    else:
        title_y = 750

    p.setFont("Helvetica-Bold", 24)
    p.setFillColorRGB(0, 0.41, 0.84) # Primary Blue
    p.drawString(160 if os.path.exists(logo_path) else 100, title_y, "AI ITRI NTIC EVENT 2026")
    
    p.setFont("Helvetica", 14)
    p.setFillColorRGB(0, 0, 0)
    p.drawString(100, 700, f"Ticket for: {req.user.full_name}")
    p.drawString(100, 680, f"Email: {req.user.email}")
    p.drawString(100, 660, f"Seat: {req.seat_id}")
    p.drawString(100, 640, f"Days: {', '.join(req.user.selected_days)}")
    
    # QR Code
    qr_data = f"{req.user.full_name}|{req.seat_id}|{req.user.email}|ITRI2026"
    qr = qrcode.make(qr_data)
    qr_img_path = "temp_qr.png"
    qr.save(qr_img_path)
    
    p.drawImage(qr_img_path, 100, 480, width=150, height=150)
    
    p.showPage()
    p.save()
    
    pdf_bytes = buffer.getvalue()
    b64_pdf = base64.b64encode(pdf_bytes).decode('utf-8')
    
    if os.path.exists(qr_img_path):
        os.remove(qr_img_path)

    return {"pdf_base64": b64_pdf}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
