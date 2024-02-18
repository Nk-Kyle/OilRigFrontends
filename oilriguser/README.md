<a name="readme-top"></a>
<br />

<div align="center">
    <h3 align="center">Underground Mine - User</h3>
    <p align="center">
        Aplikasi web untuk manajemen kehadiran karyawan dengan fitur deteksi kelengkapan alat keselatamatan
    </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#dependencies">Dependencies</a></li>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#features">Features</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Underground Mine - User adalah sebuah aplikasi web untuk manajemen karyawan. Pada Underground Mine - User, karyawan dapat melakukan login, logut, dan melihat tugas mereka yang diberikan oleh admin. Pemberian tugas dapat dilakukan melalui web Underground Mine - Admin.

Pada Underground Mine - User, karyawan dapat login melalui QR Code. Setelah itu alat keselamatan karyawan akan dideteksi oleh kamera. Jika alat keselamatan karyawan lengkap, maka karyawan dapat melakukan absensi. Jika tidak, maka karyawan tidak dapat melakukan absensi.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

-   HTML
-   CSS
-   Javascript
-   Leaflet
-   Python
-   Flask
-   OpenCV
-   Roboflow

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Tanpa Berlama-lama inilah cara menjalankan web app

### Dependencies

Program Underground Mine - User memerlukan Underground Mine - Admin untuk berjalan sepenuhnya. Underground Mine - Admin dapat diperoleh di github yang sama, namun berbeda folder. Underground Mine - Admin juga dapat diakses melalui link berikut:

```sh
https://oil-rig-admin.vercel.app/
```

### Prerequisites

-   Git
    ```sh
    https://git-scm.com/downloads
    ```
-   Python (Penulis menggunakan Python 3.10.2)
    ```sh
    https://www.python.org/downloads/
    ```
-   GCC (Untuk library OpenCV)
    ```sh
    https://code.visualstudio.com/docs/cpp/config-mingw
    ```

### Installation

1. Clone Repo ini dengan menggunakan cmd pada directory yang diinginkan
    ```sh
    C:\Users\MerekLaptop>
    git clone https://github.com/Nk-Kyle/OilRigFrontends
    ```
2. Buka Directory tempat file di clone
    ```sh
    C:\Users\MerekLaptop> cd .\OilRigFrontends\oilriguser
    C:\Users\MerekLaptop\OilRigFrontends\oilriguser>
    ```
3. Buat Venv (Opsional namun reccomended)
    ```sh
    python -m venv venv
    ```
4. Aktifkan Venv (Jika Venv dibuat pada langkah 3)
    ```sh
    .\venv\Scripts\activate
    ```
5. Install requirements.txt
    ```sh
     pip install -r requirements.txt
    ```
6. Jika memiliki GPU yang mendukung CUDA dan ingin mempercepat object detection, maka silhakan install library torch pada link berikut. Sesuaikan dengan versi cuda yang digunakan
    ```sh
     https://pytorch.org/get-started/locally/
    ```
7. Jika ingin membuat aplikasi menjadi lebih secure, silahkan ubah API_KEY pada file .env
    ```sh
     API_KEY="<SILAHKAN UBAH SESUKA HATI>"
    ```
8. Jalankan flask
    ```sh
    flask run
    ```
    <p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Features

1. QR Code Login

```sh
QR Code di detect menggunakan library OpenCV. QR Code yang digunakan adalah QR Code yang dibuat oleh Underground Mine - Admin.
```

2. Object Detection

```sh
Object detection dilakukan dengan menggunakan model yolov8. Model tersebut dilatih dengan menggunakan dataset dari roboflow. Model di train menggunakan code train.ipynb pada folder objectdetection.

Berikut merupakan langkah-langkah untuk mengubah model:
1. Ikuti langkah-langkah pada train.ipynb dari pembuatan dataset hingga download model
2. Tambahkan model baru yang sudah didownload pada folder objectdetection
3. Ganti model pada detect.py dengan model baru yang telah didownload
```

3. Map

```sh
Map dibuat menggunakan library leaflet. Map menunjukkan lokasi pekerjaan karyawan. Lokasi pekerjaan karyawan dapat diatur melalui Underground Mine - Admin.
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

| Name           | Contact                     | Github                                                            |
| -------------- | --------------------------- | ----------------------------------------------------------------- |
| Bryan Bernigen | 13520034@std.stei.itb.ac.id | <a href="https://www.github.com/bryanbernigen">@bryanbernigen</a> |
| Ng Kyle        | 13520040@std.stei.itb.ac.id | <a href="https://www.github.com/Nk-Kyle">@Nk-Kyle</a>             |

<p align="right">(<a href="#readme-top">back to top</a>)</p>
