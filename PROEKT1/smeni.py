import os

def replace_text_in_html_files():
    for root, _, files in os.walk("."):
        for file in files:
            if file.endswith(".html"):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                updated_content = content.replace("Leave a review", "Rating")
                
                if updated_content != content:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(updated_content)
                    print(f"Updated: {file_path}")

replace_text_in_html_files()
