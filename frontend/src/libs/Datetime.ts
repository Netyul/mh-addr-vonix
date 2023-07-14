// Date: 09/07/2021
interface DateTime {
  toFormatHyphen(format: string): string
  toFormatSlash(format: string): string
  now(type: string): string

}
export default class Datatime implements DateTime {
  public toFormatHyphen(format: string): string {
    const dt: Date = new Date(format)
    const day: string = dt.getDate().toString().padStart(2, '0').toString()
    const month: string = (dt.getMonth() + 1).toString().padStart(2, '0').toString()
    const year: string = dt.getFullYear().toString().toString()

    return `${year}-${month}-${day}`
  }

  public toFormatSlash(format: string): string {
    const dt: Date = new Date(format)
    const day: string = dt.getDate().toString().padStart(2, '0').toString()
    const month: string = (dt.getMonth() + 1).toString().padStart(2, '0').toString()
    const year: string = dt.getFullYear().toString().toString()

    return `${day}/${month}/${year}`
  }

  public now(type = 'slash'): string {
    const dt: Date = new Date()
    const day: string = dt.getDate().toString().padStart(2, '0')
    const month: string = (dt.getMonth() + 1).toString().padStart(2, '0')
    const year: string = dt.getFullYear().toString()
    const hour: string = dt.getHours().toString().padStart(2, '0')
    const minute: string = dt.getMinutes().toString().padStart(2, '0')
    const second: string = dt.getSeconds().toString().padStart(2, '0')

    if (type === 'Hyphen') {
    // caso tem que ser com padrão
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`
    }

    return `${day}/${month}/${year} ${hour}:${minute}:${second}`
  }
}
