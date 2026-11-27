import os
from PIL import Image, ImageDraw, ImageFont

def create_a4_letterhead():
    target_width = 1131
    target_height = 1600
    
    # Create pure white background
    base_img = Image.new("RGBA", (target_width, target_height), (255, 255, 255, 255))
    
    # Load White Dart logo
    logo_path = os.path.join(os.path.dirname(__file__), "image.png")
    if not os.path.exists(logo_path):
        print(f"Error: {logo_path} does not exist")
        return
        
    logo = Image.open(logo_path).convert("RGBA")
    
    # Create drawing context
    draw = ImageDraw.Draw(base_img)
    
    # Header styling
    # Deep professional navy: #0c1c38
    navy_color = (12, 28, 56, 255)
    header_height = 155
    
    # Draw navy header bar
    draw.rectangle([(0, 0), (target_width, header_height)], fill=navy_color)
    
    # Accent geometric lines on top right
    accent_purple = (139, 92, 246, 255)
    accent_gold = (245, 158, 11, 255)
    accent_blue = (56, 189, 248, 255)
    
    draw.polygon([(target_width - 260, 0), (target_width, 0), (target_width, header_height), (target_width - 130, header_height)], fill=(18, 42, 82, 255))
    draw.polygon([(target_width - 130, 0), (target_width, 0), (target_width, header_height), (target_width - 65, header_height)], fill=(28, 62, 118, 255))
    draw.polygon([(target_width - 50, header_height - 12), (target_width, header_height - 12), (target_width, header_height), (target_width - 70, header_height)], fill=accent_gold)
    draw.polygon([(target_width - 160, header_height - 6), (target_width - 50, header_height - 6), (target_width - 40, header_height), (target_width - 150, header_height)], fill=accent_blue)
    
    # White card box for the logo on the left of header
    card_width = 330
    card_height = header_height + 25
    draw.rectangle([(0, 0), (card_width, card_height)], fill=(255, 255, 255, 255))
    # Right border accent for the logo card
    draw.line([(card_width, 0), (card_width, card_height)], fill=(226, 232, 240, 255), width=2)
    draw.line([(card_width, card_height), (0, card_height)], fill=(226, 232, 240, 255), width=2)
    # Subtle colorful accent line under the card
    draw.line([(0, card_height + 2), (card_width, card_height + 2)], fill=accent_blue, width=4)
    
    # Resize and place logo into white card
    logo_w, logo_h = logo.size
    fit_height = 155
    fit_width = int(logo_w * (fit_height / logo_h))
    if fit_width > 295:
        fit_width = 295
        fit_height = int(logo_h * (fit_width / logo_w))
        
    logo_resized = logo.resize((fit_width, fit_height), Image.Resampling.LANCZOS)
    
    # Center logo in card
    logo_x = (card_width - fit_width) // 2
    logo_y = (card_height - fit_height) // 2
    base_img.paste(logo_resized, (logo_x, logo_y), logo_resized)
    
    # Subtle Watermark in center of page (opacity 3.5%)
    watermark_size = 560
    wm_h = int(logo_h * (watermark_size / logo_w))
    wm_logo = logo.resize((watermark_size, wm_h), Image.Resampling.LANCZOS)
    
    # Apply alpha transparency
    r, g, b, a = wm_logo.split()
    a = a.point(lambda p: int(p * 0.035))
    wm_logo.putalpha(a)
    
    wm_x = (target_width - watermark_size) // 2
    wm_y = (target_height - wm_h) // 2
    base_img.paste(wm_logo, (wm_x, wm_y), wm_logo)
    
    # Footer styling
    footer_height = 80
    footer_y = target_height - footer_height
    
    # Draw navy footer bar
    draw.rectangle([(0, footer_y), (target_width, target_height)], fill=navy_color)
    # Decorative top border on footer
    draw.line([(0, footer_y), (target_width, footer_y)], fill=(30, 58, 102, 255), width=2)
    draw.polygon([(0, footer_y - 6), (140, footer_y - 6), (120, footer_y), (0, footer_y)], fill=accent_gold)
    draw.polygon([(target_width - 140, target_height - 5), (target_width, target_height - 5), (target_width, target_height), (target_width - 130, target_height)], fill=accent_purple)
    
    # Footer text with clean typography (No emoji symbols)
    try:
        font_sm = ImageFont.truetype("arialbd.ttf", 18)
        font_xs = ImageFont.truetype("arial.ttf", 15)
        font_tag = ImageFont.truetype("arialbd.ttf", 14)
    except Exception:
        font_sm = ImageFont.load_default()
        font_xs = font_sm
        font_tag = font_sm

    # Left: Phone
    draw.text((60, footer_y + 24), "+91 93443 22482", fill=(241, 245, 249, 255), font=font_sm)
    
    # Center: Email
    email_text = "hr@whitedart.in"
    bbox = draw.textbbox((0, 0), email_text, font=font_sm)
    text_w = bbox[2] - bbox[0]
    draw.text(((target_width - text_w) // 2, footer_y + 24), email_text, fill=(241, 245, 249, 255), font=font_sm)
    
    # Right: Website
    web_text = "https://whitedart.in"
    bbox_w = draw.textbbox((0, 0), web_text, font=font_sm)
    web_w = bbox_w[2] - bbox_w[0]
    draw.text((target_width - web_w - 60, footer_y + 24), web_text, fill=(241, 245, 249, 255), font=font_sm)
    
    # Tagline right below in footer
    tagline = "WHITE DART  •  YOUR TRUST OUR RESPONSIBILITY"
    bbox_t = draw.textbbox((0, 0), tagline, font=font_tag)
    tag_w = bbox_t[2] - bbox_t[0]
    draw.text(((target_width - tag_w) // 2, footer_y + 52), tagline, fill=(148, 163, 184, 255), font=font_tag)

    # Save output letterhead
    output_path = os.path.join(os.path.dirname(__file__), "letterhead_a4.png")
    base_img.convert("RGB").save(output_path, "PNG", quality=95)
    print(f"Successfully generated A4 letterhead at: {output_path}")

if __name__ == "__main__":
    create_a4_letterhead()
