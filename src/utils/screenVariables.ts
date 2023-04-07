import { reactive } from 'vue'

function calculateSizes(screen: number): string {
    if (screen >= 1200) return 'lg'
    else if (screen >= 768) return 'sm'
    else if (screen >= 376) return 'xs'
    else return ''
}

const screen = reactive({
    width: window.innerWidth,
    size: calculateSizes(window.innerWidth),
})

window.addEventListener('resize', () => {
    screen.width = window.innerWidth

    screen.size = calculateSizes(window.innerWidth)
})

export default screen