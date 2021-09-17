# insert-style-link

[![NPM](https://nodei.co/npm/insert-style-link.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/insert-style-link/)

![publish workflow](https://github.com/zheeeng/insert-style-link/actions/workflows/publish.yml/badge.svg)
[![npm version](https://img.shields.io/npm/v/insert-style-link.svg)](https://www.npmjs.com/package/insert-style-link)

Insert, switch or shift a stylesheet `<link />`

## Install

```bash
yarn add inject-style-link (or by npm/pnpm)
```

## Usage

```ts
import { insertStyleLink, switchStyleLink } from 'inject-style-link'

const inserter = insertStyleLink('https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css')

// execute insert
inserter.use()

// execute shift, safe for multiple times execution
inserter.unuse()

// switcher holds the singleton for style `<link />` 
const switcher = switchStyleLink()

// the first time call `use(url)` execute inserting
switcher.use('https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css')

// switch to other link
switcher.use('https://cdn.jsdelivr.net/npm/normalize-css@2.3.1/normalize.min.css')

// execute shift, safe for multiple times execution
switcher.unuse()
```

## Signature

```ts
export type InsertStyleLinkOption = {
    isSameLink?: (link1: string, link2: string) => boolean,
}

export type Inserter = {
    use: () => void,
    unuse: () => void,
}

export type Switcher = {
    use: (link: string) => void,
    unuse: () => void,
}

declare const insertStyleLink: (url: string, option?: insertStyleLinkOption): Inserter

declare const switchStyleLink: (option?: insertStyleLinkOption): Switcher
```
