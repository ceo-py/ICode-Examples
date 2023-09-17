import {useEffect, useState} from "react";
import {gitGetApi} from "./GitHubGetRequest.jsx";
import {SolutionsCode} from "./SolutionsCode.jsx";
import {LanguageDropDownMenu} from "./LanguageDropDownMenu.jsx";


const languageOptions = {
    python: {
        name: {
            language: 'Python',
            db: 'python'
        },
        modules: {
            Basics: {
                'First Steps in Coding - Lab': 'First%20Steps%20in%20Coding%20-%20Lab',
                'First Steps in Coding - Exercise': 'First%20Steps%20in%20Coding%20-%20Exercise',
                'First Steps in Coding - More Exercises': 'first_steps_in_coding_more_exercises',
                'Conditional Statements - Lab': 'Conditional%20Statements%20-%20Lab',
                'Conditional Statements - Exercise': 'Conditional%20Statements%20-%20Exercise',
                'Conditional Statements - More Exercises': 'Conditional%20Statements%20-%20More%20Exercises',
                'Conditional Statements Advanced - Lab': 'Conditional%20Statements%20Advanced%20-%20Lab',
                'Conditional Statements Advanced - Exercise': 'Conditional%20Statements%20Advanced%20-%20Exercise',
                'Conditional Statements Advanced - More Exercises': 'Conditional%20Statements%20Advanced%20-%20More%20Exercises',
                'For Loop - Lab': 'For%20Loop%20-%20Lab',
                'For Loop - Exercise': 'For%20Loop%20-%20Exercise',
                'For-Loop - More Exercises': 'For-Loop%20-%20More%20Exercises',
                'While Loop - Lab': 'While%20Loop%20-%20Lab',
                'While Loop - Exercise': 'While%20Loop%20-%20Exercise',
                'While-Loop - More Exercises': 'while_loop_more_exercises',
                'Nested Loops - Lab': 'Nested%20Loops%20-%20Lab',
                'Nested Loops - Exercise': 'Nested%20Loops%20-%20Exercise',
                'Nested Loops - More Exercises': 'Nested%20Loops%20-%20More%20Exercises',
                'Drawing Figures with Loops - More Exercises': 'Drawing%20Figures%20with%20Loops%20-%20More%20Exercises'
            },
            'Basics Exams': {
                'Programming Basics Online Exam - 18 and 19 July 2020': 'PB%20-%20Exams/Programming%20Basics%20Online%20Exam%20-%2018%20and%2019%20July%202020',
                'Programming Basics Online Exam - 28 and 29 March 2020': 'Programing%20Basic%20Exam%20Preparation%2015%20July%202022',
                'Programming Basics Online Exam - 6 and 7 July 2019': 'Programming%20Basics%20Online%20Exam%20-%206%20and%207%20July%202019',
                'Programming Basics Online Exam - 15 and 16 June 2019': 'Programming%20Basics%20Online%20Exam%20-%2015%20and%2016%20June%202019',
                'Programming Basics Online Retake Exam - 2 and 3 May 2019': 'Programming%20Basics%20Online%20Retake%20Exam%20-%202%20and%203%20May%202019',
                'Programming Basics Online Exam - 20 and 21 April 2019': 'Programming%20Basics%20Online%20Exam%20-%2020%20and%2021%20April%202019',
                'Programming Basics Online Exam - 6 and 7 April 2019': 'Programming%20Basics%20Online%20Exam%20-%206%20and%207%20April%202019',
                'Programming Basics Online Exam - 9 and 10 March 2019': 'Programming%20Basics%20Online%20Exam%20-%209%20and%2010%20March%202019',
            },
            Fundamentals: {
                'Basic Syntax, Conditional Statements and Loops - Lab': 'Basic%20Syntax%2C%20Conditional%20Statements%20and%20Loops%20-%20Lab',
                'Basic Syntax, Conditional Statements and Loops - Exercise': 'Basic%20Syntax%2C%20Conditional%20Statements%20and%20Loops%20-%20Exercise',
                'Basic Syntax, Conditional Statements and Loops - More Exercises': 'Basic%20Syntax%2C%20Conditional%20Statements%20and%20Loops%20-%20More%20Exercises',
                'Data Types and Variables - Lab': 'Data%20Types%20and%20Variables%20-%20Lab',
                'Data Types and Variables - Exercise': 'Data%20Types%20and%20Variables%20-%20Exercise',
                'Data Types and Variables - More Exercises': 'Data%20Types%20and%20Variables%20-%20More%20Exercises',
                'Lists Basics - Lab': 'Lists%20Basics%20-%20Lab',
                'Lists Basics - Exercise': 'Lists%20Basics%20-%20Exercise',
                'Lists Basics - More Exercises': 'Lists%20Basics%20-%20More%20Exercises',
                'Functions - Lab': 'Functions%20-%20Lab',
                'Functions - Exercise': 'Functions%20-%20Exercise',
                'Functions - More Exercises': 'Functions%20-%20More%20Exercises',
                'Lists Advanced - Lab': 'Lists%20Advanced%20-%20Lab',
                'Lists Advanced - Exercise': 'Lists%20Advanced%20-%20Exercise',
                'Lists Advanced - More Exercises': 'Lists%20Advanced%20-%20More%20Exercises',
                'Objects and Classes - Lab': 'Objects%20and%20Classes%20-%20Lab',
                'Objects and Classes - Exericse': 'Objects%20and%20Classes%20-%20Exericse',
                'Dictionaries - Lab': 'Dictionaries%20-%20Lab',
                'Dictionaries - Exercise': 'Python-Fundamentals/Dictionaries%20-%20Exercise',
                'Dictionaries - More Exercises': 'Python-Fundamentals/Dictionaries%20-%20Lab',
                'Text Processing - Lab': 'Text%20Processing%20-%20Lab',
                'Text Processing - Exercise': 'Text%20Processing%20-%20Exercise',
                'Text Processing - More Exercises': 'Text%20Processing%20-%20More%20Exercises',
                'Regular Expressions - Lab': 'Regular%20Expressions%20-%20Lab',
                'Regular Expressions - Exercise': 'Regular%20Expressions%20-%20Exercise',
                'Regular Expressions - More Exercises': 'Regular%20Expressions%20-%20More%20Exercises',
            },
            'Fundamentals Exams': {
                '01. Programming Fundamentals Mid Exam Retake': '01.%20Programming%20Fundamentals%20Mid%20Exam%20Retake',
                '01. Programming Fundamentals Final Exam Retake': '01.%20Programming%20Fundamentals%20Final%20Exam%20Retake',
                '02. Programming Fundamentals Mid Exam': '02.%20Programming%20Fundamentals%20Mid%20Exam',
                '02. Programming Fundamentals Final Exam': '02.%20Programming%20Fundamentals%20Final%20Exam',
                '03. Programming Fundamentals Mid Exam Retake': '03.%20Programming%20Fundamentals%20Mid%20Exam%20Retake',
                '03. Programming Fundamentals Final Exam Retake': '03.%20Programming%20Fundamentals%20Final%20Exam%20Retake',
                '04. Programming Fundamentals Mid Exam': '04.%20Programming%20Fundamentals%20Mid%20Exam',
                '04. Programming Fundamentals Final Exam': '04.%20Programming%20Fundamentals%20Final%20Exam',
                '05. Programming Fundamentals Mid Exam': '05.%20Programming%20Fundamentals%20Mid%20Exam',
                '05. Programming Fundamentals Final Exam': '05.%20Programming%20Fundamentals%20Final%20Exam',
                '06. Programming Fundamentals Mid Exam Retake': '06.%20Programming%20Fundamentals%20Mid%20Exam%20Retake',
            },
            Advanced: {
                'Lists as Stacks and Queues - Lab': 'Python%20Advanced/Python%20Advanced%20-%20Exercises/Lists%20as%20Stacks%20and%20Queues%20-%20Lab',
                'Lists as Stacks and Queues - Exercise': 'Lists%20as%20Stacks%20and%20Queues%20-%20Exercise',
                'Tuples and Sets - Lab': 'Tuples%20and%20Sets%20-%20Lab',
                'Tuples and Sets - Exercise': 'Python%20Advanced/Python%20Advanced%20-%20Exercises/Tuples%20and%20Sets%20-%20Exercise',
                'Stacks, Queues, Tuples and Sets - Exercise': 'Python%20Advanced/Python%20Advanced%20-%20Exercises/Stacks%2C%20Queues%2C%20Tuples%20and%20Sets%20-%20Exercise',
                'Multidimensional Lists - Lab': 'Python%20Advanced/Python%20Advanced%20-%20Exercises/Multidimensional%20Lists%20-%20Lab',
                'Multidimensional Lists - Exercise 1': 'Python%20Advanced/Python%20Advanced%20-%20Exercises/Multidimensional%20Lists%20-%20Exercise%201',
                'Multidimensional Lists - Exercise 2': 'Python%20Advanced/Python%20Advanced%20-%20Exercises/Multidimensional%20Lists%20-%20Exercise%202',
                'Functions Advanced - Lab': 'Python%20Advanced/Python%20Advanced%20-%20Exercises/Functions%20Advanced%20-%20Lab',
                'Functions Advanced - Exercise': 'Python%20Advanced/Python%20Advanced%20-%20Exercises/Functions%20Advanced%20-%20Exercise',
            },
            'Advanced Exams': {
                'Python Advanced Retake Exam - 14 December 2022': 'Python%20Advanced%20-%20Exams/Python%20Advanced%20Retake%20Exam%20-%2014%20December%202022',
                'Python Advanced Exam - 22 October 2022': 'Python%20Advanced%20-%20Exams/Python%20Advanced%20Exam%20-%2022%20October%202022',
                'Python Advanced Retake Exam - 18 August 2022': 'Python%20Advanced%20-%20Exams/Python%20Advanced%20Retake%20Exam%20-%2018%20August%202022',
                'Python Advanced Exam - 25 June 2022': 'Python%20Advanced%20-%20Exams/Python%20Advanced%20Exam%20-%2025%20June%202022',
                'Python Advanced Retake Exam - 14 April 2022': 'Python%20Advanced%20-%20Exams/Python%20Advanced%20Retake%20Exam%20-%2014%20April%202022',
                'Python Advanced Exam - 19 February 2022': 'Python%20Advanced%20-%20Exams/Python%20Advanced%20Exam%20-%2019%20February%202022',
                'Python Advanced Retake Exam - 15 December 2021': 'Python%20Advanced%20-%20Exams/Python%20Advanced%20Retake%20Exam%20-%2015%20December%202021',
                'Python Advanced Exam - 23 October 2021': 'Python%20Advanced%20-%20Exams/Python%20Advanced%20Exam%20-%2023%20October%202021',
                'Python Advanced Retake Exam - 14 April 2021': 'Python%20Advanced%20-%20Exams/Python%20Advanced%20Retake%20Exam%20-%2014%20April%202021',
                'Python Advanced Exam - 14 February 2021': 'Python%20Advanced%20-%20Exams/Python%20Advanced%20Exam%20-%2014%20February%202021',
                'Python Advanced Retake Exam - 16 December 2020': 'Python%20Advanced%20-%20Exams/Python%20Advanced%20Retake%20Exam%20-%2016%20December%202020',
                'Python Advanced Exam - 24 October 2020': 'Python%20Advanced%20-%20Exams/Python%20Advanced%20Exam%20-%2024%20October%202020',
                'Python Advanced Retake Exam - 19 August 2020': 'Python%20Advanced%20-%20Exams/Python%20Advanced%20Retake%20Exam%20-%2019%20August%202020',
                'Python Advanced Exam - 27 June 2020': 'Python%20Advanced%20-%20Exams/Python%20Advanced%20Exam%20-%2027%20June%202020',
            },
            OOP: {
                'First Steps in OOP - Lab': 'Python%20Advanced/Python-OOP-Exercises/First%20Steps%20in%20OOP%20-%20Lab',
                'First Steps in OOP - Exercise': 'Python%20Advanced/Python-OOP-Exercises/First%20Steps%20in%20OOP%20-%20Exercise',
                'Classes and Objects - Lab': 'Python%20Advanced/Python-OOP-Exercises/Classes%20and%20Objects%20-%20Lab',
                'Classes and Objects - Exercise': 'Python%20Advanced/Python-OOP-Exercises/Classes%20and%20Objects%20-%20Exercise',
                'Inheritance - Lab': 'Python%20Advanced/Python-OOP-Exercises/Inheritance%20-%20Lab',
                'Inheritance - Exercise': 'Python%20Advanced/Python-OOP-Exercises/Inheritance%20-%20Exercise',
                'Encapsulation - Lab': 'Python%20Advanced/Python-OOP-Exercises/Encapsulation%20-%20Lab',
                'Encapsulation - Exercise': 'Python%20Advanced/Python-OOP-Exercises/Encapsulation%20-%20Exercise',
                'Static and Class Methods - Lab': 'Python%20Advanced/Python-OOP-Exercises/Static%20and%20Class%20Methods%20-%20Lab',
                'Static and Class Methods - Exercise': 'Python%20Advanced/Python-OOP-Exercises/Static%20and%20Class%20Methods%20-%20Exercise',
                'Polymorphism and Abstraction - Lab': 'Python%20Advanced/Python-OOP-Exercises/Polymorphism%20and%20Abstraction%20-%20Lab',
                'Polymorphism and Abstraction - Exercise': 'Python%20Advanced/Python-OOP-Exercises/Polymorphism%20and%20Abstraction%20-%20Exercise',
                'Iterators and Generators - Lab': 'Python%20Advanced/Python-OOP-Exercises/Iterators%20and%20Generators%20-%20Lab',
                'Iterators and Generators - Exercise': 'Python%20Advanced/Python-OOP-Exercises/Iterators%20and%20Generators%20-%20Exercise',
                'Decorators - Lab': 'Python%20Advanced/Python-OOP-Exercises/Decorators%20-%20Lab',
                'Decorators - Exercise': 'Python%20Advanced/Python-OOP-Exercises/Decorators%20-%20Exercise',
                'Testing - Lab': 'Python%20Advanced/Python-OOP-Exercises/Testing%20-%20Lab',
                'Testing - Exercise': 'Python%20Advanced/Python-OOP-Exercises/Testing%20-%20Exercise',
            },
            'OOP Exams': {
                'Python OOP Retake Exam - 19 December 2022': 'Python-OOP-Exams/Python%20OOP%20Retake%20Exam%20-%2019%20December%202022/project_1_concert_tracker_app',
                'Python OOP Exam - 10 December 2022': 'Python-OOP-Exams/Python%20OOP%20Exam%20-%2010%20December%202022',
                'Python OOP Retake Exam - 22 August 2022': 'Python-OOP-Exams/Python%20OOP%20Retake%20Exam%20-%2022%20August%202022',
                'Python OOP Exam - 14 August 2022': 'Python-OOP-Exams/Python%20OOP%20Exam%20-%2014%20August%202022',
                'Python OOP Retake Exam - 18 April 2022': 'Python-OOP-Exams/Python%20OOP%20Retake%20Exam%20-%2018%20April%202022',
                'Python OOP Exam - 10 April 2022': 'Python-OOP-Exams/Python%20OOP%20Exam%20-%2010%20April%202022',
                'Python OOP Exam - 11 December 2021': 'Python-OOP-Exams/Python%20OOP%20Exam%20-%2011%20December%202021',
                'Python OOP Retake Exam - 23 August 2021': 'Python-OOP-Exams/Python%20OOP%20Retake%20Exam%20-%2023%20August%202021',
                'Python OOP Exam - 15 August 2021': 'Python-OOP-Exams/Python%20OOP%20Exam%20-%2015%20August%202021',
                'Python OOP Exam - 10 April 2021': 'Python-OOP-Exams/Python%20OOP%20Exam%20-%2010%20April%202021',
                'Python OOP Retake Exam - 22 Aug 2020': 'Python-OOP-Exams/Python%20OOP%20Retake%20Exam%20-%2022%20Aug%202020',
                'Python OOP Exam - 16 Aug 2020': 'Python-OOP-Exams/Python%20OOP%20Exam%20-%2016%20Aug%202020',
            },
        },
    },
    javascript: {
        name: {
            language: 'JavaScript',
            db: 'js'
        },
        modules: {
            Basics: {
                'First Steps in Coding - Lab': 'Programming%20Basics/First%20Steps%20In%20Coding%20-%20Lab',
                'First Steps in Coding - Exercise': 'Programming%20Basics/First%20Steps%20In%20Coding%20-%20Exercise',
                'First Steps in Coding - More Exercises': 'Programming%20Basics/First%20Steps%20in%20Coding%20-%20More%20Exercises',
                'Conditional Statements - Lab': 'Conditional%20Statements%20-%20Lab',
                'Conditional Statements - Exercise': 'Conditional%20Statements%20-%20Exercise',
                'Conditional Statements - More Exercises': 'Conditional%20Statements%20-%20More%20Exercises',
                'Conditional Statements Advanced - Lab': 'Conditional%20Statements%20Advanced%20-%20Lab',
                'Conditional Statements Advanced - Exercise': 'Conditional%20Statements%20Advanced%20-%20Exercise',
                'For Loop - Lab': 'For%20Loop%20-%20Lab',
                'For Loop - Exercise': 'For%20Loop%20-%20Exercise',
                'While Loop - Lab': 'While%20Loop%20-%20Lab',
                'While Loop - Exercise': 'While%20Loop%20-%20Exercise',
                'Nested Loops - Lab': 'Nested%20Loops%20-%20Lab',
                'Nested Loops - Exercise': 'Nested%20Loops%20-%20Exercise',
            },
            'Basics Exams': {
                'Programming Basics Online Pre - Exam - 10 and 11 June 2023': 'Programming%20Basics/JS%20Basics%20-%20Exams/Programming%20Basics%20Online%20Pre%20-%20Exam%20-%2010%20and%2011%20June%202023',
            },
            'JS Advanced - Exams': {
                'JS Advanced Exam - 18 February 2023': 'JS%20Advanced%20-%20Exams/JS%20Advanced%20Exam%20-%2018%20February%202023/01.Ski%20Lift',
                'JS Advanced Retake Exam - 7 December 2022': 'JS%20Advanced%20-%20Exams/JS%20Advanced%20Retake%20Exam%20-%207%20December%202022/01.Hotel%20Reservation',
                'JS Advanced Exam - 22 October 2022': 'JS%20Advanced%20-%20Exams/JS%20Advanced%20Exam%20-%2022%20October%202022/01.%20Scary%20Story',
                'JS Advanced Exam - 25 Jun 2022': 'JS%20Advanced%20-%20Exams/JS%20Advanced%20Exam%20-%2025%20Jun%202022/01.%20Car%20Dealers',
                'JS Advanced Retake Exam - 6 Apr 2022': 'JS%20Advanced%20-%20Exams/JS%20Advanced%20Retake%20Exam%20-%206%20Apr%202022/01.%20Forum%20posts',
                'JS Advanced Exam - 13 March 2022': 'JS%20Advanced%20-%20Exams/JS%20Advanced%20Exam%20-%2013%20March%202022/01.%20Mails%20Delivery',
                'Js Advanced Final Exam - 19 February 2022': 'JS%20Advanced%20-%20Exams/Js%20Advanced%20Final%20Exam%20-%2019%20February%202022/01.%20Work%20Process',
                'Js Advanced Final Retake Exam - 10 December 2021': 'JS%20Advanced%20-%20Exams/Js%20Advanced%20Final%20Retake%20Exam%20-%2010%20December%202021/01.%20Service',
                'JS Advanced Final Exam - 23 October 2021': 'JS%20Advanced%20-%20Exams/JS%20Advanced%20Final%20Exam%20-%2023%20October%202021/01.%20Music%20Site',
                'JS Advanced Final Retake Exam - 12 August 2021': 'JS%20Advanced%20-%20Exams/JS%20Advanced%20Final%20Retake%20Exam%20-%2012%20August%202021/01.%20Furniture%20Store',
                'JS Advanced Final Exam - 27 June 2021': 'JS%20Advanced%20-%20Exams/JS%20Advanced%20Final%20Exam%20-%2027%20June%202021/01.%20Travel%20Agency',
                'JS Advanced Exam - 20 February 2021': 'JS%20Advanced%20-%20Exams/JS%20Advanced%20Exam%20-%2020%20February%202021/01.%20SoftBlog',
                'JS Advanced - Exam Prep - 15.02.2021': 'JS%20Advanced%20-%20Exams/JS%20Advanced%20-%20Exam%20Prep%20-%2015.02.2021/01.%20Christmas%20Gifts%20Delivery',
                'JS Advanced Retake - 08 April 2020': 'JS%20Advanced%20-%20Exams/JS%20Advanced%20Retake%20-%2008%20April%202020/01.%20Task%20Manager',
                'JS Advanced Retake Exam - 10 December 2019': 'Christmas%20Gifts%20Delivery',
            },
            'JS-Front-End': {
                'JS Syntax Fundamentals - Lab': 'JS%20Syntax%20Fundamentals%20-%20Lab',
                'JS Syntax Fundamentals - Exercises': 'JS%20Syntax%20Fundamentals%20-%20Exercise',
                'JS Syntax Fundamentals - More Exercises': 'JS%20Syntax%20Fundamentals%20-%20More%20Exercises',
                'Functions and Statements - Lab': 'Functions%20and%20Statements%20-%20Lab',
                'Functions and Statements - Exercises': 'Functions%20and%20Statements%20-%20Exercises',
                'Functions and Statements - More Exercises': 'Functions%20and%20Statements%20-%20More%20Exercises',
                'Objects and Classes - Lab': 'Objects%20and%20Classes%20-%20Lab',
                'Objects and Classes - Exercises': 'Objects%20and%20Classes%20-%20Exercises',
                'Objects and Classes - More Exercises': 'Objects%20and%20Classes%20-%20More%20Exercises',
                'DOM Introduction - Lab': 'DOM%20and%20Events%20-%20Lab',
                'DOM Introduction - Exercises': 'DOM%20and%20Events%20-%20Exercises',
                'DOM and Events - More Exercises': 'DOM%20and%20Events%20-%20More%20Exercises',
                'HTTP and REST - Exercises': 'HTTP%20and%20REST%20-%20Exercises',
                'HTTP and REST - More Exercises': 'HTTP%20and%20REST%20-%20More%20Exercises',
            },
            'JS-Front-End Exams': {
                'Exam Preparation I': 'JS-Front-End-Exams/Exam%20Preparation%20I',
                'Exam Preparation II': 'JS-Front-End-Exams/Exam%20Preparation%20II',
                'JS Front-End Regular Exam - 8 Apr 2023': 'JS-Front-End-Exams/%20JS%20Front-End%20Regular%20Exam%20-%208%20Apr%202023',
                'JS Front-End Retake Exam - 20 Apr 2023': 'JS%20Front-End%20Retake%20Exam%20-%2020%20Apr%202023',
            },
        },
    },
    java: {
        name: {
            language: 'Java',
            db: 'java'
        },
        modules: {
            Basics: {
                'First Steps in Coding - Lab': 'First%20Steps%20In%20Coding%20-%20Lab',
                'First Steps in Coding - Exercise': 'First%20Steps%20In%20Coding%20-%20Exercise',
                'First Steps in Coding - More Exercises': 'First%20Steps%20in%20Coding%20-%20More%20Exercises',
                'Conditional Statements - Lab': 'Conditional%20Statements%20-%20Lab',
                'Conditional Statements - Exercise': 'Conditional%20Statements%20-%20Exercise',
                'Conditional Statements - More Exercises': 'Conditional%20Statements%20-%20More%20Exercises',
                'Conditional Statements Advanced - Lab': 'Conditional%20Statements%20Advanced%20-%20Lab',
                'Conditional Statements Advanced - Exercise': 'Conditional%20Statements%20Advanced%20-%20Exercise',
                'Conditional Statements Advanced - More Exercises': 'Conditional%20Statements%20Advanced%20-%20More%20Exercises',
                'For Loop - Lab': 'For%20Loop%20-%20Lab',
                'For Loop - Exercise': 'For%20Loop%20-%20Exercise',
                'For-Loop - More Exercises': 'For-Loop%20-%20More%20Exercises',
                'While Loop - Lab': 'While%20Loop%20-%20Lab',
                'While Loop - Exercise': 'While%20Loop%20-%20Exercise',
                'While-Loop - More Exercises': 'While-Loop%20-%20More%20Exercises',
                'Nested Loops - Lab': 'Nested%20Loops%20-%20Lab',
                'Nested Loops - Exercise': 'Nested%20Loops%20-%20Exercise',
                'Nested Loops - More Exercises': 'Nested%20Loops%20-%20More%20Exercises',
                'Drawing Figures with Loops - More Exercises': 'Drawing%20Figures%20with%20Loops%20-%20More%20Exercises'
            },
            'Basics Exams': {
                'Programming Basics Online Exam - 18 and 19 July 2020': 'Exams/Programming%20Basics%20Online%20Exam%20-%2018%20and%2019%20July%202020',
                'Programming Basics Online Exam - 28 and 29 March 2020': 'Exams/Programming%20Basics%20Online%20Exam%20-%2028%20and%2029%20March%202020',
                'Programming Basics Online Exam - 6 and 7 July 2019': 'Programming%20Basics%20Online%20Exam%20-%206%20and%207%20July%202019',
                'Programming Basics Online Exam - 15 and 16 June 2019': 'Programming%20Basics%20Online%20Exam%20-%2015%20and%2016%20June%202019',
                'Programming Basics Online Retake Exam - 2 and 3 May 2019': 'Programming%20Basics%20Online%20Retake%20Exam%20-%202%20and%203%20May%202019',
                'Programming Basics Online Exam - 20 and 21 April 2019': 'Programming%20Basics%20Online%20Exam%20-%2020%20and%2021%20April%202019',
                'Programming Basics Online Exam - 6 and 7 April 2019': 'Programming%20Basics%20Online%20Exam%20-%206%20and%207%20April%202019',
                'Programming Basics Online Exam - 9 and 10 March 2019': 'Programming%20Basics%20Online%20Exam%20-%209%20and%2010%20March%202019',
            },
            Fundamentals: {
                'Basic Syntax, Conditional Statements and Loops - Lab': 'Java%20Fundamentals/Basic%20Syntax%2C%20Conditional%20Statements%20and%20Loops%20-%20Lab',
                'Basic Syntax, Conditional Statements and Loops - Exercise': 'Java%20Fundamentals/Basic%20Syntax%2C%20Conditional%20Statements%20and%20Loops%20-%20Exercise',
                'Basic Syntax, Conditional Statements and Loops - More Exercise': 'Java%20Fundamentals/Basic%20Syntax%2C%20Conditional%20Statements%20and%20Loops%20-%20More%20Exercise',
                'Data Types and Variables - Lab': 'Java%20Fundamentals/Data%20Types%20and%20Variables%20-%20Lab',
                'Data Types and Variables - Exercise': 'Java%20Fundamentals/Data%20Types%20and%20Variables%20-%20Exercise',
                'Data Types and Variables - More Exercise': 'Java%20Fundamentals/Data%20Types%20and%20Variables%20-%20More%20Exercise',
                'Arrays - Lab': 'Java%20Fundamentals/Arrays%20-%20Lab',
                'Arrays - Exercise': 'Java%20Fundamentals/Arrays%20-%20Exercise',
                'Arrays - More Exercise': 'Java%20Fundamentals/Arrays%20-%20More%20Exercise',
                'Methods - Lab': 'Java%20Fundamentals/Methods%20-%20Lab',
                'Methods - Exercise': 'Java%20Fundamentals/Methods%20-%20Exercise',
                'Methods - More Exercise': 'Java%20Fundamentals/Methods%20-%20More%20Exercise',
                'Lists - Lab': 'Java%20Fundamentals/Lists%20-%20Lab',
                'Lists - Exercise': 'Java%20Fundamentals/Lists%20-%20Exercise',
                'Lists - More Exercise': 'Java%20Fundamentals/Lists%20-%20More%20Exercise',
                'Objects and Classes - Lab': 'Objects%20and%20Classes%20-%20Lab',
                'Objects and Classes - Exercise': 'Objects%20and%20Classes%20-%20Exercise',
                'Objects and Classes - More Exercise': 'Objects%20and%20Classes%20-%20More%20Exercise',
                'Maps, Lambda and Stream API - Lab': 'Maps%2C%20Lambda%20and%20Stream%20API%20-%20Lab',
                'Maps, Lambda and Stream API - Exercise': 'Maps%2C%20Lambda%20and%20Stream%20API%20-%20Exercise',
                'Maps, Lambda and Stream API - More Exercise': 'Maps%2C%20Lambda%20and%20Stream%20API%20-%20More%20Exercise',
                'Text Processing - Lab': 'Text%20Processing%20-%20Lab',
                'Text Processing - Exercise': 'Text%20Processing%20-%20Exercise',
                'Text Processing - More Exercise': 'Text%20Processing%20-%20More%20Exercise',
                'Regular Expressions - Lab': 'Regular%20Expressions%20-%20Lab',
                'Regular Expressions - Exercise': 'Regular%20Expressions%20-%20Exercise',
                'Regular Expressions - More Exercise': 'Regular%20Expressions%20-%20More%20Exercise',
            },
            'Fundamentals Exams': {
                '01. Programming Fundamentals Mid Exam Retake': '01.%20Programming%20Fundamentals%20Mid%20Exam%20Retake',
                '01. Programming Fundamentals Final Exam Retake': '01.%20Programming%20Fundamentals%20Final%20Exam%20Retake',
                '02. Programming Fundamentals Mid Exam': '02.%20Programming%20Fundamentals%20Mid%20Exam',
                '02. Programming Fundamentals Final Exam': '02.%20Programming%20Fundamentals%20Final%20Exam',
                '03. Programming Fundamentals Mid Exam Retake': '03.%20Programming%20Fundamentals%20Mid%20Exam%20Retake',
                '03. Programming Fundamentals Final Exam Retake': '03.%20Programming%20Fundamentals%20Final%20Exam%20Retake',
                '04. Programming Fundamentals Mid Exam': '04.%20Programming%20Fundamentals%20Mid%20Exam',
                '04. Programming Fundamentals Final Exam': '04.%20Programming%20Fundamentals%20Final%20Exam',
                '05. Programming Fundamentals Mid Exam': '05.%20Programming%20Fundamentals%20Mid%20Exam',
                '05. Programming Fundamentals Final Exam': '05.%20Programming%20Fundamentals%20Final%20Exam',
                '06. Programming Fundamentals Mid Exam Retake': '06.%20Programming%20Fundamentals%20Mid%20Exam%20Retake',
            },
            Advanced: {
                'Stacks and Queues - Lab': 'Stacks%20and%20Queues%20-%20Lab',
                'Stacks and Queues - Exercises': 'Stacks%20and%20Queues%20-%20Exercises',
                'Multidimensional Arrays - Lab': 'Multidimensional%20Arrays%20-%20Lab',
                'Multidimensional Arrays - Exercises': 'Multidimensional%20Arrays%20-%20Exercises',
                'Sets And Maps Advanced - Lab': 'Sets%20And%20Maps%20Advanced%20-%20Lab',
                'Sets And Maps Advanced - Exercises': 'Sets%20And%20Maps%20Advanced%20-%20Exercises',
                'Streams, Files And Directories - Lab': 'Streams%2C%20Files%20And%20Directories%20-%20Lab',
                'Streams, Files And Directories - Exercises': 'Streams%2C%20Files%20And%20Directories%20-%20Exercises',
                'Functional Programming - Lab': 'Functional%20Programming%20-%20Lab',
                'Functional Programming - Exercises': 'Functional%20Programming%20-%20Exercises',
                'Defining Classes - Lab': 'Defining%20Classes%20-%20Lab',
                'Defining Classes - Exercises': 'Defining%20Classes%20-%20Exercises',
                'Generics - Lab': 'Generics%20-%20Lab',
                'Generics - Exercises': 'Generics%20-%20Exercises',
                'Iterators and Comparators - Lab': 'Iterators%20and%20Comparators%20-%20Lab',
                'Iterators and Comparators - Exercises': 'Iterators%20and%20Comparators%20-%20Exercises',
                'Basic Algorithms - Lab': 'Basic%20Algorithms%20-%20Lab',
            },
        },
    },
    html: {
        name: {
            language: 'HTML & CSS',
            db: 'html_css'
        },
        modules: {
            Basics: {
                'Introduction to HTML and CSS': 'Introduction%20to%20HTML%20%26%20CSS',
                'HTML Structure': 'HTML%20Structure',
                'CSS & Typography': 'CSS%20%26%20Typography',
                'CSS Box Model': 'CSS%20Box%20Model',
                'Flexbox': 'Flexbox',
                'Position and Grid': 'Position%20and%20Grid',
                'Media Queries': 'Media%20Queries',
            },
            'Basics Exams': {
                'HTML and CSS Retake Exam - 13 August 2019': 'HTML%20and%20CSS%20-%20Exams/HTML%20and%20CSS%20Retake%20Exam%20-%2013%20August%202019',
                'HTML & CSS Exam - 03 November 2019': 'HTML%20and%20CSS%20-%20Exams/HTML%20%26%20CSS%20Exam%20-%2003%20November%202019',
                'HTML & CSS Retake Exam - 17 December 2019': 'HTML%20and%20CSS%20-%20Exams/HTML%20%26%20CSS%20Retake%20Exam%20-%2017%20December%202019',
                'HTML5 & CSS - Exam - 21 March 2020': 'HTML%20and%20CSS%20-%20Exams/HTML5%20%26%20CSS%20-%20Exam%20-%2021%20March%202020',
                'HTML & CSS Exam - 28 March 2020': 'HTML%20and%20CSS%20-%20Exams/HTML%20%26%20CSS%20Exam%20-%2028%20March%202020',
                'HTML & CSS Retake Exam - 12 August 2020': 'HTML%20and%20CSS%20-%20Exams/HTML%20%26%20CSS%20Retake%20Exam%20-12%20August%202020',
                'HTML & CSS Exam - 01 November 2020': 'HTML%20and%20CSS%20-%20Exams/HTML%20%26%20CSS%20Exam%20-%2001%20November%202020',
                'HTML & CSS Retake Exam - 15 December 2020': 'HTML%20and%20CSS%20-%20Exams/HTML%20%26%20CSS%20Retake%20Exam%20-%2015%20December%202020',
                'HTML & CSS Exam - 30 October 2021': 'HTML%20and%20CSS%20-%20Exams/HTML%20%26%20CSS%20Exam%20-%2030%20October%202021',
                'HTML & CSS Retake Exam - 14 December 2021': 'HTML%20and%20CSS%20-%20Exams/HTML%20%26%20CSS%20Retake%20Exam%20-%2014%20December%202021',
                'HTML & CSS Exam - 19 February 2022': 'HTML%20and%20CSS%20-%20Exams/HTML%20%26%20CSS%20Exam%20-%2019%20February%202022',
                'HTML & CSS Regular Exam - 27 Feb 2022': 'HTML%20and%20CSS%20-%20Exams/HTML%20%26%20CSS%20Regular%20Exam%20-%2027%20Feb%202022',
                'HTML & CSS Retake Exam - 19 Apr 2022': 'HTML%20and%20CSS%20-%20Exams/HTML%20%26%20CSS%20Retake%20Exam%20-%2019%20Apr%202022',
                'HTML & CSS Retake Exam - 18 Aug 2022': 'HTML%20and%20CSS%20-%20Exams/HTML%20%26%20CSS%20Retake%20Exam%20-%2018%20Aug%202022',
                'HTML & CSS Exam - 26 Jun 2022': 'HTML%20and%20CSS%20-%20Exams/HTML%20%26%20CSS%20Exam%20-%2026%20Jun%202022',
                'HTML & CSS Regular Exam - 13 Apr 2023': 'HTML%20and%20CSS%20-%20Exams/HTML%20%26%20CSS%20Regular%20Exam%20-%2013%20Apr%202023',
            },
        },
    },
    mssql: {
        name: {
            language: 'MS SQL',
            db: 'mssql'
        },
        modules: {
            Basics: {
                'Databases Introduction': 'Databases%20Basics%20-%20Exercises/Databases%20Introduction',
                'CRUD': 'Databases%20Basics%20-%20Exercises/CRUD',
                'Table Relations': 'Databases%20Basics%20-%20Exercises/Table%20Relations',
                'Built-in Functions': 'Databases%20Basics%20-%20Exercises/Built-in%20Functions',
                'Subqueries and Joins': 'Databases%20Basics%20-%20Exercises/Subqueries%20and%20Joins',
                'Indices and Data Aggregation': 'Databases%20Basics%20-%20Exercises/Indices%20and%20Data%20Aggregation',
                'Functions and Stored Procedures': 'Databases%20Basics%20-%20Exercises/Functions%20and%20Stored%20Procedures',
                'Triggers and Transactions': 'Databases%20Basics%20-%20Exercises/Triggers%20and%20Transactions',
                'Additional Exercises': 'Databases%20Basics%20-%20Exercises/Additional%20Exercises',
            },
        },
    }
}

// eslint-disable-next-line react/prop-types
function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [output, setOutput] = useState([]);
    const [result, setResult] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedModule, setSelectedModule] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('');
    const selectedLanguageData = languageOptions[selectedLanguage];
    const selectedModuleData = selectedLanguageData?.modules[selectedModule];


    useEffect(() => {
        setResult(output)
    }, [output]);

    useEffect(() => {
        setSearchTerm('')
        setOutput([])
    }, [selectedTopic, selectedModule, selectedLanguage]);


    const handleSearchChange = (event) => {
        const context = event.target.value;

        setSearchTerm(context);

        if (!context.trim()) return setResult(output);

        setResult(output.filter(x => x.name.toLowerCase().includes(context.toLowerCase())));
    };

    // const handleSearchSubmit = async () => {
    //     // setOutput(await gitGetApi(url))
    // };

    const handleTopicChange = async (event) => {
        const currentSelection = event.target.value

        setSelectedTopic(currentSelection);
        if (!currentSelection) return


        const queryOptions = {
            language: selectedLanguageData.name.db,
            module: selectedModule,
            topic: selectedModuleData[currentSelection]
        };

        setOutput(await gitGetApi(queryOptions));
    };

    return (
        <>
            <LanguageDropDownMenu
                handleTopicChange={handleTopicChange}
                selectedLanguage={selectedLanguage}
                selectedModule={selectedModule}
                selectedTopic={selectedTopic}
                selectedLanguageData={selectedLanguageData}
                selectedModuleData={selectedModuleData}
                languageOptions={languageOptions}
                setSelectedLanguage={setSelectedLanguage}
                setSelectedModule={setSelectedModule}
            />
            <div className="App">
                <h1>Search App</h1>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                {/*<button onClick={handleSearchSubmit}>Search</button>*/}
            </div>
            <h3>{selectedLanguage} {selectedModule} {selectedTopic}</h3>
            <SolutionsCode output={result}/>
        </>
    )
}


export default App
