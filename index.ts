const links = typeof window === 'undefined' ? null : document.getElementsByTagName('link')

export type InsertStyleLinkOption = {
    isSameLink?: (link1: string, link2: string) => boolean,
}

export type Inserter = {
    use: () => void,
    unuse: () => void,
}

export const insertStyleLink = (url: string, { isSameLink = (link1, link2) => link1 === link2 }: InsertStyleLinkOption = {}): Inserter => {
    const link = document.createElement('link')
    link.href = url
    const fullHref = link.href

    link.type = 'text/css'
    link.rel = 'stylesheet'

    function unuse () {
        // prevent insertion duplication
        const maybeExistedLink = Array.from(links ?? []).find(l => isSameLink(l.href, fullHref))
        if (maybeExistedLink) maybeExistedLink.parentNode?.removeChild(maybeExistedLink)

        if (document.head.contains(link)) document.head.removeChild(link)
    }

    function use () {
        // clear
        unuse()

        document.head.appendChild(link)
    
    }

    return { use, unuse }
}

export type Switcher = {
    use: (link: string) => void,
    unuse: () => void,
}

export const switchStyleLink = (option: InsertStyleLinkOption = {}): Switcher => {
    let insertIns: Inserter | undefined

    function unuse () {
        insertIns?.unuse()
    }

    function use (link: string) {
        unuse()

        insertIns = insertStyleLink(link, option)

        insertIns.use()
    }

    return { use, unuse }
}
