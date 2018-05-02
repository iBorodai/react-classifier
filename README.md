# Изучаю реакт на практике

- [Изучаю реакт на практике](#)
    - [Description](#description)
    - [States - Список состояний приложения](#states)
    - [Notes](#notes)
        - [webpack](#webpack)

## Description

Компонент для выбора классификатора 

Идея в том, чтобы Компонент получал управляющие функкции извне и использовал их в процессе работы.
Упраляющие функции - получают дерево классификатора, получают перечень указанных классов, ищут классы по строке, т.д.

Компонент реализует интерфейс на странице и ... вроде как все


## States - Список состояний приложения
 - Init. App loading 
    - load all passed dependencies, create internal service components
    - get all initial values (preset classifier ids)
 - opened modal

## Notes 

### webpack 

    Основная статья S1
    https://www.valentinog.com/blog/webpack-4-tutorial/

    Вспомогательная статья S2
    https://www.robinwieruch.de/minimal-react-webpack-babel-setup/#babel-react-setup


    S1: в разделе "webpack 4: setting up webpack 4 with React" нужно дополнительно добавить секцию 
    ```json
        "babel": {
            "presets": [
                "env",
                "react",
                "stage-2"
            ]
        },
    ```
    на первый уровень package.json

    https://stackoverflow.com/questions/33527653/babel-6-regeneratorruntime-is-not-defined
    настройка полифила для корректной работы с async в webpack