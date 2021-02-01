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

- /app/profile/detail/<int:id>/ (GET)
    
   - Návratové hodnoty:
      - id
      - first_name
      - last_name
      - bio
      - profile_pic
      <br>
  Endpoint pro zobrazení cizích profilů.
  
  
- /app/profile/ (GET, PUT)
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


- /app/board/ (GET)
   - Návratové hodnoty:
      - id
      - name
      <br>
   Endpoint pro získání všech boardů, ve kterých je uživatel aspoň členem.
   
- /app/board/<int:id>/ (PUT, DELETE)
    - name (pokud je zavolán PUT requestem)
    <br>
    Endpoint pro smazání a nebo úpravu jména tabule. Pokud uživatel tabuli nevlastní (nemá roli owner), nemůže ji upravit a ani smazat.

- /app/board/create/ (POST)
    - Návratové hodnoty:
      - id
      - name
    <br>
    Endpoint pro vytvoření nové tabule. Uživatel, který tabuli takto vytvoří, se zároveň automaticky stane jejím vlastníkem.
    
- /app/board/detail/<int:id>/ (GET)
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

- /app/board/users/<int:id_tabule>/ (GET)
    - Návratové hodnoty:
        - first_name
        - last_name
        - bio
        - profile_pic
        - role
<br>
Endpoint, který zobrazí všechny uživatele jedné tabule. Uživatelé jsou seřazeni podle rolí.

- /app/log/<int:id_tabule>/ (GET)
    - Návratové hodnoty:
        - text
        - time
        - board
        - task
        - profile
        - comment
        <br>
    Endpoint pro zobrazení logu tabule. Uživatel, který na tabuli není aspoň členem, dostane místo dat 403 FORBIDDEN.
    
- /app/task/create/ (POST)
    - title (Not NULL, string, max 50 znaků)
    - description (string)
    - deadline (čas ve formátu %Y-%m-%d %H:%M:%S, nesmí být časový údaj minulosti)
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

- /app/task/<int:id>/ (PATCH, DELETE, GET)
    - title (Not NULL, string, max 50 znaků)
    - description (string)
    - deadline (čas ve formátu %Y-%m-%d %H:%M:%S, nesmí být časový údaj minulosti)
    - stage (ENUM('not_started', 'in_progress', 'on_hold', 'almost_finished', 'done'))  
    - Návratové hodnoty:
        - id
        - author
        - title 
        - description
        - deadline
        - stage
        - taskboard
        <br>
    Endpoint pro zobrazení, upravení a nebo smazání určitého příspěvku. 
    Příspěvky může uživatel vytvářet jen tam, kde je členem. Argumenty v těle requestu jsou potřebné jen při použití metody PATCH.
    Příspěvky může mazat autor, moderátor a vlastník tabule. 
    
- /app/task/attachment/ (POST)
    - title (Not NULL, string, max 200 znaků)
    - file (soubor, maximální velikost 50 MB)
    - type (ENUM('audio', 'image', 'text', 'video', 'other'))
    - task (int, id příspěvku)
    - Návratové hodnoty:
        - id
        - title 
        - last_update
        - file
        - type
        - task
        <br>
    Endpoint pro vytvoření přílohy. Přílohu může uživatel vytvářet jen tam, kde je členem.    

 - /app/task/attachment/<int:id_prilohy>/ (PATCH, GET, DELETE)
    - title (Not NULL, string, max 200 znaků)
    - file (soubor, maximální velikost 50 MB)
    - type (ENUM('audio', 'image', 'text', 'video', 'other'))
    - task (int, id příspěvku)
    - Návratové hodnoty:
        - id
        - title 
        - last_update
        - file
        - type
        - task
        <br>      
    Endpoint pro zobrazení, upravení a nebo smazání přílohy. 
    Přílohy může uživatel vytvářet jen tam, kde je členem. Argumenty v těle requestu jsou potřebné jen při použití metody PATCH.
    Přílohy může mazat autor, moderátor a vlastník tabule.  
    
- /app/task/comments/<int:id_prispevku>/ (GET, POST)
    - text (Not NULL, string, max 1000 znaků)
    - Návratové hodnoty:
        - id
        - text
        - timestamp
        - task
        <br>
    Endpoint pro zobrazení všech komentářů u příspěvku a nebo pro napsání komentáře u příspěvku.
    
- /app/task/comments/delete/<int:id_komentare/ (DELETE)
        <br>
        Endpoint pro smazání komentáře. Komentáře může smazat autor, moderátor a vlastník skupiny.

- /app/users/invite/ (POST)
    - profile (int, id profilu)
    - taskboard (int, id tabule)
    <br>
    Do tabule můžou nové uživatele přidávat pouze moderátoři a vlastníky. Takto přidaný uživatel automaticky získá roli člena.

- /app/board/manage-user/ (PATCH, DELETE)
    - profile (int, id profilu)
    - taskboard (int, id tabule)
    - role (ENUM('member', 'moderator', 'owner'))
    <br>
    Při volání metody DELETE se nemusí specifikovat role, jelikož není důležitá. Tato metoda umí buď:
        - Smazat uživatelovu roli (vyhodit uživatele z tabule). To můžou jak moderátoři, tak vlastníci. Moderátoři můžou vyhodit pryč jen obyčejné uživatele.
        - Změnit něčí uživatelskou roli z člena na moderátora. To může jen vlastník.
        - Předat někomu vlastnictví. To starého vlastníka o vlastnictví připraví a stane se moderátorem.
    
