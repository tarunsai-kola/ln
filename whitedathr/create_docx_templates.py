import os
import zipfile
import re

def convert_template(src_docx, dest_docx, logo_bytes):
    templates_dir = os.path.dirname(dest_docx)
    os.makedirs(templates_dir, exist_ok=True)
    
    with zipfile.ZipFile(src_docx, 'r') as zin:
        with zipfile.ZipFile(dest_docx, 'w') as zout:
            for item in zin.infolist():
                buffer = zin.read(item.filename)
                
                # Replace images with White Dart logo
                if item.filename.startswith("word/media/"):
                    buffer = logo_bytes
                
                # Replace company text in xml files
                if item.filename.endswith(".xml") or item.filename.endswith(".rels"):
                    text = buffer.decode("utf-8", errors="ignore")
                    text = text.replace("Accenlearn", "White Dart")
                    text = text.replace("accenlearn.com", "whitedart.in")
                    text = text.replace("support@accenlearn.com", "hr@whitedart.in")
                    text = text.replace("hr@accenlearn.com", "hr@whitedart.in")
                    buffer = text.encode("utf-8")
                    
                zout.writestr(item, buffer)
    print(f"Created template: {dest_docx}")

def main():
    base_dir = r"c:\Users\tarun\OneDrive\Desktop\ln-main"
    whitedat_dir = os.path.join(base_dir, "whitedathr")
    templates_dir = os.path.join(whitedat_dir, "templates")
    
    logo_path = os.path.join(whitedat_dir, "image.png")
    with open(logo_path, "rb") as f:
        logo_bytes = f.read()
        
    src_intern = os.path.join(base_dir, "Accenlearn_Offer_Letter_Intern.docx")
    src_full = os.path.join(base_dir, "Accenlearn_Offer_Letter_Full_Time.docx")
    
    dest_intern = os.path.join(templates_dir, "WhiteDart_Offer_Letter_Intern.docx")
    dest_full = os.path.join(templates_dir, "WhiteDart_Offer_Letter_Full_Time.docx")
    
    convert_template(src_intern, dest_intern, logo_bytes)
    convert_template(src_full, dest_full, logo_bytes)

if __name__ == "__main__":
    main()
