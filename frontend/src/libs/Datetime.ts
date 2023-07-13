// Date: 09/07/2021
interface DateTime {
  toFormatHyphen(format: string): string
  toFormatSlash(format: string): string

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
}
