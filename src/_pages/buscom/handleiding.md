---
layout: page
title: Handleiding
subtitle: Hoe deze site bewerken
---

> Enige basiskennis van HTML, CSS en JavaScript is gewenst om deze handleiding goed te kunnen begrijpen

### Eleventy

Deze site werd gebouwd op Eleventy, een "Static Site Generator". Eleventy is een op JavaScript gebaseerde package die een combinatie van data en bestanden met content omvormt in webpagina's.

##### Basiswerking

Er worden een aantal templates aangemaakt waar er op bepaalde plaatsen aan de hand van variabelen bepaalde content zal komen. Dan heb je een aantal folders binnen je project met bestanden die deze content bevatten. In Eleventy is er heel wat keuze wat betreft het soort bestand dat je gebruikt voor je content. De meest gebruikte data-types zijn HTML, Nunjucks, Liquid, Markdown en meer.

##### Het "builden"

Bij het builden zal Eleventy desbetreffende template ophalen en het bestand met de content in "mergen" met het template. In sé zal Eleventy de variabelen vervangen met die content. In dat content-bestand moet je natuurlijk wel aangeven welke variabele met welke content vervangen wordt.

[illustratie werking van eleventy]

##### Configuratie

Het voordeel aan Eleventy is dat het heel makkelijk en uitgebreid te configureren is. Aangezien het gebruik maakt van JavaScript als basis kan je gebruiken van node packages (best te omschrijven als plug en play JavaScript-functies die andere developers ter beschikking stellen via een handig platform/systeem) en de andere vele tools die voor JavaScript beschikbaar zijn.

De template-engine is ingesteld op Liquid. Liquid is een templating language voor het inladen van dynamische content. Liquid werd ontwikkeld door Shopify, een dienst om webshops op te zetten.

In een .liquid-bestand kan je gewonen HTML schrijven maar het is de manier van het aangeven waar de variabelen komen die dan bepaald wordt door liquid.

Verder is er weinig configuratie gedaan buiten aangeven waar bepaalde folders komen. Hierover kan je meer lezen onder "folderstructuur".

[Hier](https://github.com/pgm-lenndery/case1-pgm-website-pgm-lenndery/blob/master/.eleventy.js) vind je de volledige configuratie van Eleventy.

### Folderstructuur

Ik heb de volgende folderstuctuur gehanteerd:
- De Eleventy-build komt in /docs
- Alle bronbestanden die door Eleventy worden gebruikt staan in /src

In de *src*-folder staat zoveel mogelijk op het zelfde niveau zodat het makkelijker wordt om een bepaalde folder terug te vinden. Volgens de basis-configuratie zoude bijvoorbeeld de *_data* en de *_layouts* folders in *_includes* zitten, maar het leek me overzichtelijker om die op het zelfde niveau te zetten en de *_includes*-folder ook effectief enkel voor include-bestanden (meer info bij Includes) te houden.

Uiteindelijk krijg je onderstaande folderstructuur:

```
project root
├── docs
└── src
│   ├── _data
│   ├── _includes
│   ├── _layouts
│   ├── _pages
│   ├── _sass
│   └── _static
│       ├── css
│       └── js
│           ├── modules
│           └── plugins
├── .eleventy.js
└── package.json
```

##### Docs-folder

De *docs*-folder is waar het resultaat van de build in te vinden zal zijn.

Het is belangrijk dat wijzigingen alleen in de *src*-folder worden aangebracht aangezien alle wijzigingen in de *docs*-folder overschreven worden bij een volgende build.

**Wijzigen van build-directory**

Wanneer je de naam van de build-folder wilt wijzigen zoek je naar het volgende code:

```js
return {
    pathPrefix: '/case1-pgm-website-pgm-lenndery/',
    dir: {
        output: 'docs',// output folder
        input: 'src/',
        data: '_data',
        pages: '_pages',
        includes: '_includes',
        layouts: '_layouts'
    },
    markdownTemplateEngine: 'liquid',
    htmlTemplateEngine: 'liquid',
}
```

De *output*-instelling vind je op de eerste regel in het dir-object, hier kan je 'docs' vervangen door iets anders.

### Url's

##### Pad-prefix

Het gebeurt regelmatig dat een statische website gehost wordt op GitHub Pages en dan is het belangrijk dat je rekening houdt met die url.

Een url ziet er meestal zo uit: ```https://username.github.io/repository-naam```

Met de repository-naam moet rekening gehouden worden bij het gebruik van url's. Een url naar de homepage zou er normaal uitzien als ```href="/"```, dit verwijst naar de root van het domein waar de site gehost wordt.

Maar wanneer de site gehost wordt onder een apparte directory die op GitHub Pages de naar van de repository meekrijgt moet hier rekening mee gehouden worden, want dan zal ```href="/"``` verwijzen naar ```https://username.github.io```, maar eigenlijk moeten we naar ```https://username.github.io/repository-naam```.

Dit lossen we op door een prefix in te stellen in het eleventy-config bestand.

##### Instellen via .eleventy.js

Onderaan het bestand vind je de ```return```-functie, daaronder heb je ```pathPrefix```, hier zal je de slug na het domein invullen.

In dit geval wordt de site gehost op ```https://pgmgent-1920-students.github.io/case1-pgm-website-pgm-lenndery```, dus vul je als pathPrefix ```'/case1-pgm-website-pgm-lenndery/'``` in.

```js
return {
    pathPrefix: '/case1-pgm-website-pgm-lenndery/', // pad-prefix
    dir: {
        output: 'docs',
        input: 'src/',
        data: '_data',
        pages: '_pages',
        includes: '_includes',
        layouts: '_layouts'
    },
    markdownTemplateEngine: 'liquid',
    htmlTemplateEngine: 'liquid',
}
```

##### Gebruik van url's in Liquid

Om naar een pagina binnen deze site te verwijzen maak je gebruik van een Liquid variabele en de url filter. Deze filter zal automatisch de prefix toevoegen aan elke url met deze filter.

Stel je wilt naar de contactpagina op deze site verwijzen:
- Binnen een ander systeem zou je normaal het volgende doen ```href="case1-pgm-website-baas-pgm-lenndery/contact"```
- Binnen Eleventy, met behulp van Liquid kan je dit eenvoudiger doen: ```{% raw %}href="{{ '/contact' | url }}"{% endraw %}```

Dit werkt voor alle linken die gelegd worden binnen Eleventy, ook naar bestanden en dergelijke.

Ook belangrijk om te weten is dat Eleventy autmatisch de relatieve paden naar de bestemmingen telkens zal genereren.

### Media- en databestanden

Alle media wordt voorlopig voor deze site op een apparte repo gehost via GitHub Pages. Het enige wat moet gebeuren is de bestanden toevoegen in de *src*-folder binnen die repo en de bestanden zullen na het builden van die repo (dat automatisch gebeurt) beschikbaar zijn.

De bestanden zijn via [https://pgmgent-1920-students.github.io/case1-pgm-website-baas-pgm-lenndery/](https://pgmgent-1920-students.github.io/case1-pgm-website-baas-pgm-lenndery/) beschikbaar.

Normaal zou je een 404-pagina zien én zou je, wanneer je een specifiek bestand zoekt de url moeten gaan uitpluizen naar dat bestand aan de hand van waar je het geplaatst hebt.

Dit heb ik opgelost door een script te schrijven dat een oplijsting genereert van alle bestanden binnen de *src*-folder. Het is dus zo simpel als copy-pasten van de link die je bij elk bestand vindt.

Telkens wanneer er een nieuw bestand aan de repo wordt toegevoegd zal de lijst opnieuw gegenereerd worden door GitHub Actions. Dit detecteerd een nieuwe push naar de repo en zal mijn script uitvoeren. Na twee à drie minuuten zijn de bestanden beschikbaar via bovenstaande url.

---

### Data aanpassen
##### Opleidingsinfo, contactinfo & technologieën

De contactinformatie is de vinden in de Eleventy-repo onder ```src/_data/opleiding.json```.

Deze data is beschikbaar via liquid-variabelen, bijvoorbeeld: ```{% raw %}{{ opleiding.contact.email }}{% endraw %}```.
De variabelen worden altijd geopend en gesloten met 2 accolades. Daarna begin je met de naam van het json-bestand, bijvoorbeeld 'opleiding', gevolgd door javascript selectoren zoals je dat normaal doet bij JSON-data.

Nog een voorbeeld: ```{% raw %}{{ opleiding.contact.personen[0].naam }}{% endraw %}``` geeft uiteindelijk "Olvier Parent".

##### Curriculum

Het curriculum wordt volledig gegenereerd door middel van Javascript. Het JSON-bestand hier voor is [hier](https://pgmgent-1920-students.github.io/case1-pgm-website-baas-pgm-lenndery/src/data/curry.json) te vinden.

Hier worden alle vakken verdeeld onder de vijf opleidingsdomeinen in een array als object. Hier wordt dan per vak de nodige data meegegeven.

### Pagina's aanpassen

De meeste pagina's bevinden zich in de *src/_pages*-folder. Voor het schrijven van pagina's wordt over het algemeen Markdown gebruikt. Markdown is een zeer eenvoudige en snel aan te leren taal. [Hier vind je een cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

Naast Markdown kunnen pagina's ook gewoon met pure HTML gemaakt worden, hier kan je een .html- of .liquid-bestand voor gebruiken.

##### Basisconfiguratie

Elke pagina krijgt een basisconfiguratie mee die eenvoudig op te zetten is, dit noemen we **frontmatter**. Zo herkent Elventy hoe de pagina moet gebuild worden.

Dit moet bovenaan elke pagina worden toegevoegd ...
```yaml
{% raw %}---
layout: page
title: Handleiding
subtitle: Hoe deze site bewerken
--- {% endraw %}
```

Standaard zal een interne link geopend worden in een modal, als je dit wilt overschrijven verander je de layout naar *no-modal*.

De andere instellingen wijzen zichzelf uit.

##### Pagina-url

De pagina-url wordt standaard gegenereerd op basis van de naam dat het bestand heeft en de locatie waar het zich bevindt.

Als het bestand *bedrijven.liquid* zich in de folder *contact* bevindt (in de *_pages*-folder) dan zal de url van die pagina *contact/bedrijven* worden.

Dit kan je overschrijven door in de frontmatter een variable ```permalink``` mee te geven.

```yaml
{% raw %}---
layout: page
title: Bedrijven
subtitle: Samenwerken met ons
permalink: contact/bedrijven/index.html
---{% endraw %}
```
### Cases, portfolio, etc.

Cases worden allemaal met JavaScript gegenereerd. Dit JSON-bestand is hier te vinden: [https://pgmgent-1920-students.github.io/case1-pgm-website-baas-pgm-lenndery/src/data/cases.json](https://pgmgent-1920-students.github.io/case1-pgm-website-baas-pgm-lenndery/src/data/cases.json)

Voor studenten geldt hetzelfde principe: [https://pgmgent-1920-students.github.io/case1-pgm-website-baas-pgm-lenndery/src/data/students.json](https://pgmgent-1920-students.github.io/case1-pgm-website-baas-pgm-lenndery/src/data/students.json)

Dit is allemaal pure JSON-data die zichzelf uitwijst.

---

### Kleurthema wijzigen

Huidig kleurthema bestaat uit
- $purple500: #7f47dd;
- $mainBackground: black;

Het kleurthema kan gewijzigd worden door de variabelen aan te passen in *[src/_sass/_variables.scss](https://github.com/pgm-lenndery/case1-pgm-website-pgm-lenndery/blob/master/src/_sass/_variables.scss)*

