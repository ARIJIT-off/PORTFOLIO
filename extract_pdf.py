import os
from pypdf import PdfReader

pdfs = [
    r"C:\Users\aleri\Downloads\PORTFOLIO\Railsmart\railsmart.pdf",
    r"C:\Users\aleri\Downloads\PORTFOLIO\Polluture\POLLUTURE.pdf",
    r"C:\Users\aleri\Downloads\PORTFOLIO\Rideriddles\ride (1).pdf",
    r"C:\Users\aleri\Downloads\PORTFOLIO\UEMSEAT\uemseats.pdf",
    r"C:\Users\aleri\Downloads\PORTFOLIO\Movieheist\movieheist.pdf"
]

for pdf_path in pdfs:
    print(f"\n--- Extracting: {os.path.basename(pdf_path)} ---")
    try:
        reader = PdfReader(pdf_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        print(text[:1500]) # Print first 1500 characters of each to get the gist
    except Exception as e:
        print(f"Error: {e}")
