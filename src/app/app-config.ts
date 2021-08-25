import { environment } from './../environments/environment';

export const AppConfig = {
  meta: {
    default: {
      title: "devhus",
      titleSuffix: "",
      description: "The official resume website of Hossam Hassan (aka devhus). Devhus is an all-around software engineer. Currently lives in Egypt and born on Jan 1, 1998.",
      keywords: "devhus,resume,personal,projects,about,hossam,hassan,hossam hassan,web,desktop,dev,developer,programmer,frontend,backend,fullstack",
      image: `${environment.appUrl}/assets/image/personal-image.png`
    }
  },
  info: {
    copyrightYear: 2018,
  }
}