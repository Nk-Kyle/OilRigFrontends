import win32print, win32api
import requests
import os

def print_pdf(pdf_links):
    #Donwload Link:https://www.mediafire.com/download/yf52p2izc57z456/GHOSTSCRIPT.rar
    GHOSTSCRIPT_PATH = "C:\\Users\\Igen\\Downloads\\GHOSTSCRIPT\\bin\\gswin64.exe"
    #Donwload Link:https://www.mediafire.com/download/h2dpmq2frtw5psu/GSPRINT.rar
    GSPRINT_PATH = "C:\\Users\\Igen\\Downloads\\GSPRINT\\gsprint.exe"

    # YOU CAN PUT HERE THE NAME OF YOUR SPECIFIC PRINTER INSTEAD OF DEFAULT
    currentprinter = win32print.GetDefaultPrinter()
    current_path = "D:/git/Projects/OilRig/OilRigFrontends/oilriguser/"
    
    #download file from google drive link
    i = 0
    for url in pdf_links:
        file_id = url.split('/')[-2]
        dwn_url='https://drive.google.com/uc?export=download&id=' + file_id
        response = requests.get(dwn_url)

        # save file
        file_name = 'printer/file/file'+str(i)+'.pdf'
        with open(file_name, 'wb') as f:
            f.write(response.content)
            f.close()

        # print file
        file_full_path = current_path+file_name
        win32api.ShellExecute(0, 'open', GSPRINT_PATH, '-ghostscript "'+GHOSTSCRIPT_PATH+'" -color -sPAPERSIZE=a4 -dFIXEDMEDIA -dPDFFitPage -printer "'+currentprinter+'" "'+file_full_path+'"', '.', 0)
        i+=1