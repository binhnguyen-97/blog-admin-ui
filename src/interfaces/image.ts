type IThumb = {
  url: string
}

export interface IImage {
  title: string,
  id: string,
  display_url: string,
  thumb: IThumb
}
