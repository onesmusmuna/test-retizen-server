export class cr {
  static str(status: TStatus, msg: string): IReturn {
    return { status, msg };
  }

  static strLoad(status: TStatus, msg: string, load: TLoad): IReturn {
    return { status, msg, load };
  }

  static load(status: TStatus, load: TLoad): IReturn {
    return { status, load };
  }
}

type TStatus = "aok" | "bbad" | "cfail";

type TLoad = { [index: string]: unknown };

interface IReturn {
  status: TStatus;
  msg?: string;
  load?: TLoad;
}
