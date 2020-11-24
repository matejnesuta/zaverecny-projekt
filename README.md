<h1>Závěrečný projekt - Nástěnka úkolů</h1>
Toto je společný repozitář pro náš závěrečný maturitní projekt. S <a href="https://github.com/martindzida">Martinem Dzidou</a> děláme něco jako nástěnku úkolů. Já mám na starosti back-end v Djangu (REST API v Django Rest) a kontejnerizaci celé aplikace v Dockeru a Martin má na starost front-end v React.js.
<br><br>
Aplikace je rozdělena na 3 Docker kontejnery (front-end, back-end ve formě REST API a databázový server). Pro REST API je použitý framework Django REST a dj-rest-auth (dodatečný balíček pro autentifikaci, na který odkazuje dokumentace Djanga REST). Data jsou pak uložena v PostgreSQL databázi a přes API se tahají na front-end. Na front-endu se používají technologie React.js pro dynamické vykreslování stránky za pomocí komponentů, React-router-dom pro použivání url adres na front-endu, Redux a Redux React pro globální ukládání dat v aplikaci, Axios pro komunikaci s REST API a Bootstrap 4 pro dodatečný vzhled a responzivitu.

<h3>Cíle</h3>
<p>Cílem tohoto projektu je vytvořit nástěnku úkolů pro více uživatelů, kde můžou mít různí uživatelé různé role a můžou být přiřazováni do různých skupin. Back-end chci vytvořit v Django REST, data ukládat do nějaké SQL databáze a aplikaci jako takovou vyvíjet pro Docker. Bylo by vhodné ukládat k příspěvkům (úkolům) přílohy a externí soubory, zaznamenávat čas a mít možnost provádět řazení a vyhledávání. Dále bych chtěl umožnit autentifikaci uživatelů pomocí E-mailu při registraci/zapomenutí hesla (na e-mail uživatele přijde zpráva s odkazem/kontrolním kódem).</p>

<h3>Jak nainstalovat</h3>
<p>Prvním a asi nejsložitějším krokem je nainstalování Dockeru. Ve Windows a Mac stačí nainstalovat <a href="https://docs.docker.com/desktop/">Docker Desktop</a>. V Linuxu je to lehce složitější. Mně v Ubuntu 18.04 pomohl <a href="https://phoenixnap.com/kb/how-to-install-docker-on-ubuntu-18-04">tento návod</a>, avšak nevěřím, že to půjde takhle lehce všude. Poté je ještě potřeba doinstalovat git a pak už stačí zadat jen tyto 3 příkazy do příkazové řádky: 
<br>

```
git clone https://github.com/matejnesuta/zaverecny-projekt
cd zaverecny-projekt
docker-compose up --build
```
Při prvním spuštění projektu bude Djangu chybět superuživatel, ale to se dá velmi jednoduše vyřešit. Stačí zmáčknout klávesovou zkratku <code>CTRL+Z</code> pro přenesení procesu do pozadí (nebo alternativně otevřít 2. terminál). Pak stačí zadat jen příkaz <code>docker exec -it backend python3 backend/manage.py createsuperuser</code>. Pro vrácení výstupu procesu je potřeba zadat příkaz <code>fg</code>. 
<br><br>
Při prvním spuštění <code>docker-compose up</code> se vytvoří image kontejnerů a poté spustí. Při dalších spuštěních tohoto příkazu se již vytvořené image kontejnerů jen spustí. Kontejnery se dají postavit znovu pomocí příkazů <code>docker-compose up --build</code>, což je nutné dělat pokaždé, když se v souborech s projektem provede změna.
<br><br>
Na Windows se může objevit error ohledně toho, že Docker nemá přístup ke složce s projektem (vyznačuje se hláškou: <code>ERROR: for db  Cannot create container for service db: status code not OK but 500</code>). Jeho řešení se dá najít <a href="https://stackoverflow.com/questions/60754297/docker-compose-failed-to-build-filesharing-has-been-cancelled">zde</a>.</p>

<h3>Testovací repozitáře</h3>

<a href="https://github.com/matejnesuta/django_rest_tutorial">Mé první setkání s Django REST</a>

<h3>Inspirace</h3>
<a href="https://www.youtube.com/watch?v=ovql0Ui3n_I">Hodně jednoduché přidávání úkolů tady</a> a <a href="https://www.youtube.com/watch?v=4RWFvXDUmjo">tady</a><br>
<a href="https://www.youtube.com/watch?v=eBsc65jTKvw">Restrikce uživatelů</a><br>
<a href="https://www.youtube.com/channel/UCTZRcDjjkVajGL6wd76UnGg/about">Krásné tutoriály na Django framework</a><br>
<a href="https://www.youtube.com/watch?v=X7DWErkNVJs">Posílání emailů</a><br>

<h3>Průběh práce</h3> 

<h5>10. 11. 2020</h5>
<p>Všiml jsem si, že jsem nevalidoval soubory u profilových obrázků a u příloh, tak jsem dodělal validaci. Okomentoval jsem částečně kód.</p>


<h5>09. 11. 2020</h5>
<p>Vytvořil jsem první end-pointy pro samotnou aplikaci. Konkrétně se jedná a zobrazení a úpravu profilu uživatele (GET, PUT) a zobrazení detailu profilů ostatních uživatelů (GET). Věřím, že psaní dalších end-pointů půjde jako po másle.</p>

<h5>04. 11. 2020</h5>
<p>Databáze má vlastní kontejner. Je potřeba doplnit sekci o instalaci, jelikož instalace samotná se lehce rozšířila.</p>

<h5>30. 10. 2020</h5>
<p>Ztratil jsem absolutně pojem o čase. Docker funguje, propojení funguje, verifikace by taky měla (otestuju až se vyspím). Také úspěšně vypisuju na frontend data z databáze. Spoustu času jsem strávil analýzou kódu <a href="https://github.com/jazzband/dj-rest-auth/">dj-rest-auth</a> a sekce issues. 

<h5>07. 10. 2020</h5>
<p>Front-end a back-end má nyní každý svůj kontejner v Dockeru. Spoustu času mi trvalo vyřešit jejich propojení 
(React neviděl Django) a i potom mi Django házelo 400 bad request a já zatím nevím proč. Dopoledne dodám návod na instalaci.<br>

<i>Doba práce: 6 hodin </i></p>

<h5>03. 10. 2020</h5>
<p>Do Djanga se dá nyní jak přihlásit, tak registrovat pomocí jednoduchého webového rozhraní v Reactu. Nyní, když obě aplikace jedou spolu, můžu konečně obojí hodit pro snažší instalaci do Dockeru.<br>

<i>Doba práce: 3 hodin </i></p>

<h5>28. 09. 2020</h5>
<p>Hledání ideální knihovny umožňující jak emailovou verifikaci, tak registraci a login pomocí sociálních sítí a 
její následná implementace. Taky oprava hloupých bugů. Mám v REST frameworku konečně funkční jak normální registraci, 
tak login. <br>

<i>Doba práce: 5 hodin </i></p>

<h5>23. 09. 2020</h5>
<p>Jen lehký aktualizační commit. Přibyl tam formulář pro login, ale ten společně s registrací vymažu, jelikož chci udělat všechno v Django REST. 

<h5>16. 09. 2020</h5>
<p>Vytvořil jsem vlastní funkční registrační formulář, jelikož defaultní mi nestačil. Uživatel se registruje pomocí
 jména a hesla a poté je uložen do databáze. Nyní je potřeba doplnit přihlašovací formulář, tlačítko pro odhlášení, 
 emailová autentifikace (aby bylo jasné, že daný email skutečně existuje) a přihlašování přes Facebook a Google. 
 Myslím si, že do víkendu to stihnu. Poté začnu budovat API pro React. 
 <br>
 <br>
 <small>Včera jsem zapomněl udělat commit, oops.</small>
 <br>
 <br>
 Tento commit v sobě nemá moc kódu, jelikož jsem většinu času buď opravoval bugy týkající se urls.py a views.py,
 nebo jsem řešil a hledal, jak bych mohl do aplikace vůbec login a sign up vložit.<br>

<i>Doba práce: 5-6 hodin </i></p>

<h5>13. 09. 2020</h5>
<p>Dopsání zbytku databázového modelu podle přiloženého diagramu a zajištění ukládání příloh 
(ukládají se do vlastní složky a v databázi je pak uložena je cesta k nim). Můj další plán je nyní naprogramovat 
registraci a přihlašování uživatelů.<br>
<i>Doba práce: 2 hodiny</i></p>

<h5>10. 09. 2020</h5>
<p>Oprava bugů, psaní modelu pro profil a jeho následné navázání na uživatelský model. Hlavně teda ale oprava bugů.<br>
<i>Doba práce: 2 hodiny 30 minut</i></p>

<h5>04. 09. 2020</h5>
<p>Udělal jsem začátek Django aplikace s vlastním uživatelským modelem, jelikož jsem chtěl, aby se lidé přihlašovali 
pomocí e-mailu a ne uživatelského jména. Také jsem ještě zkontroloval a lehce zkrášlil diagram. <br>
<i>Doba práce: 3 hodiny</i></p>

<h5>29. 07. 2020</h5>
<p>Vytvořil jsem si předběžný diagram své databáze pro tuto aplikaci v programu DIA.<br>
<i>Doba práce: 2 hodiny</i></p>
