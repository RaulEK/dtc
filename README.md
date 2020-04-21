## Rakenduse kasutamine
Külasta veebilehte: https://raulek.github.io/dtc/

või jooksuta kohalikult:
```
git clone https://github.com/RaulEK/dtc.git
cd dtc
npm install
npm start
```

## Üldine dokumentatsioon
Tööks kulus aega 11 tundi + dokumenteerimine. Lihtne oli kasutaja sisendi lugemine *input* väljadega ja üldise programmi loogika tegemine. Tänu [recharts](https://recharts.org/en-US/) teegile oli ka graafiku loomine otsekohene. Raskem oli [react-leaflet](https://react-leaflet.js.org/) kaardi integreerimine ja kõige rohkem tähelepanu vajas päeva pikkuse arvutamine, mille implementeerimise käigus tekkinud *bug*ide tagaajamine võttis päris palju aega. Peamiselt oli keeruline *Date* objektiga ümber käimine. Lahenduses teeb arvutused ära [suncalc](https://github.com/mourner/suncalc) teek, aga alguses sain info kätte [APIst](https://sunrise-sunset.org/api). See aga ei toetanud nii suurel hulgal päringuid kui mul vaja läks.

Sain kõik probleemid lahendatud. Lisafunktsionaalsust ei lisanud ja rakendust tegin ilusamaks ainult elementide positsioneerimisega.

## Lahenduse kirjeldus
Rakenduse tegin *ReactJS*iga. Kõik peamine kood on kaustades *src/components* (*UserInterface.js, Result.js, MapContainer.js*) ja *src/services* (*calculator.js*). *calculator.js* fail tagastab koordinaatide ja kuupäevade põhjal järjendi objektidest, kus iga objekt on üks kuupäev ja omab välje *date, sunrise, sunset, time*. Põhifail on *UserInterface.js*, mis kuvab ekraanile sisendväljad ja kaardi (*MapContainer.js*) ning peab meeles kasutaja sisendit. Otsingu korral saadab ta kasutaja sisendi *calculator.js*i ja sealt pärinevad andmed *Result.js*i. Viimase ülesanne on kuvada ekraanile algkuupäeva päeva pikkus ja teha kõigist kuupäevade andmetest graafik.
