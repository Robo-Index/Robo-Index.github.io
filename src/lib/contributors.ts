export interface Person {
  name: string
  github: string
  email?: string
}

export const maintainers: Person[] = [
  { name: 'Ce Hao (郝策)', github: 'CeHao1' },
  { name: 'Yinglei Zhu', github: 'fly-pigTH' },
  { name: 'David Li', github: 'DavidLi03' },
]

export const contributors: Person[] = [
  { name: 'louisz', github: 'louisz', email: 'zylbhsf@gmail.com' },
]
