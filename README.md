# Card JS

## Начало работы

``` bash
npm install
npm run dev
```

Остальные задачи описаны в файле [package.json](https://github.com/MaxFeskov/card-js/blob/master/package.json)

## Поддержка сборки нескольких языков

Если задать соответствующий словарь в папке [data](https://github.com/MaxFeskov/card-js/tree/master/src/data), то можно делать сборку для конкретного языка.

Пример через gulp

``` bash
gulp --locale en
```

Пример через npm run

``` bash
npm run dev -- --locale en
```

## Работа с автозаполнением

* Принимает данные от google pay (сканирование карты)
* Работает автозаполнение адреса и данных карты (в google chrome точно, в остальных нужно тестировать)

## И еще немного текста

Данный проект пока не претендует на статус полноценного продукта. Скорее это некий шаблон, который еще будет дорабатываться.

[Пример](https://maxfeskov.github.io/card-js/)
