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
Pro jejich používání musí být uživatel přihlášen.

- /auth/profile/detail/<int:id>/ (GET)
    
   - Návratové hodnoty:
      - id
      - first_name
      - last_name
      - bio
      - profile_pic
      <br>
  Endpoint pro zobrazení cizích profilů.
  
  
- /auth/profile/detail/ (GET, PUT)
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
      <br>
   Endpoint pro zobrazení a nebo úpravu vlastního profilu.


- /auth/board/ (GET)
   - Návratové hodnoty:
      - id
      - name
      <br>
   Endpoint pro získání všech boardů, ve kterých je uživatel aspoň členem.
   
- /auth/board/<int:id>/ (PUT, DELETE)
    - name (pokud je zavolán PUT requestem)
    <br>
    Endpoint pro smazání a nebo úpravu jména tabule. Pokud uživatel tabuli nevlastní (nemá roli owner), nemůže ji upravit a ani smazat.

- /auth/board/create/ (POST)
    - Návratové hodnoty:
      - id
      - name
    <br>
    Endpoint pro vytvoření nové tabule. Uživatel, který tabuli takto vytvoří, se zároveň automaticky stane jejím vlastníkem.
    
- /auth/board/detail/<int:id>/ (GET)
    - Návratové hodnoty:
        - id
        - author
        - title
        - description
        - deadline
        - stage
        - taskboard
          <br>
   Endpoint pro zobrazení všech úkolů dané tabule. Uživatel, který na tabuli není aspoň členem, dostane místo dat 403 FORBIDDEN.
   

- /auth/log/<int:id_tabule>/ (GET)
    - Návratové hodnoty:
        - text
        - time
        - board
        - task
        - profile
        - comment
        <br>
    Endpoint pro zobrazení logu tabule. Uživatel, který na tabuli není aspoň členem, dostane místo dat 403 FORBIDDEN.
    
- /auth/task/create/ (POST)
    - title (Not NULL, string, max 50 znaků)
    - description (string)
    - deadline (čas ve formátu %Y-%m-%d %H:%M:%S)
    - stage (ENUM('not_started', 'in_progress', 'on_hold', 'almost_finished', 'done'))
    - taskboard (int, id tabule)
    - Návratové hodnoty:
        - id
        - author
        - title 
        - description
        - deadline
        - stage
        - taskboard
        <br>
    Endpoint pro vytvoření příspěvku. Příspěvky může uživatel vytvářet jen tam, kde je členem.
