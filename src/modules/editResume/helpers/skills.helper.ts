const skillTypes = ['danger', 'success', 'warning']
let typeIndex = -1

export const getSkillType = (): string => {
    typeIndex++

    if (typeIndex > 2) {
        typeIndex = 0
    }

    return skillTypes[typeIndex]
}