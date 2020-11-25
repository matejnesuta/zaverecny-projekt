Endpointy aplikace
=============

Autentifikace
-----

- /auth/login/ (POST)

    - email
    - password

    Vrací Token key

- /auth/logout/ (POST)

    - key (Token)

- /auth/password/reset/ (POST)

    - email

- /auth/password/reset/confirm/ (POST)

    - uid
    - token
    - new_password1
    - new_password2

    .. note:: uid a token jsou poslány mailem po zavolání /auth/password/reset/

- /auth/password/change/ (POST)

    - new_password1
    - new_password2
    - old_password


- /auth/registration/ (POST)

    - password1
    - password2
    - email

- /auth/registration/verify-email/ (POST)

    - key

    .. note:: Key se posílá emailem po registraci.



Hlavní endpointy
---------------------------

- /profile/detail/<int:id>/ (GET)
    
   - Návratové hodnoty:
      - id
      - first_name
      - last_name
      - bio
      - profile_pic

  Endpoint pro zobrazení cizích profilů.
  
  
- /profile/detail/ (GET, PUT)
   
      - first_name (Not NULL, string)
      - last_name  (Not NULL, string)
      - bio (string, maximální délka 150 znaků)
      - profile_pic (obrázek, maximální velikost 10 MB)
   
   - Návratové hodnoty:
      - id
      - first_name
      - last_name
      - bio
      - profile_pic
      
   Endpoint pro zobrazení a nebo úpravu vlastního profilu.
