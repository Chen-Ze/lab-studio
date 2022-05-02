export interface InstrumentController {
  list: () => Promise<string[]>;
  open: (name: string, address: string) => Promise<void>;
  write: (name: string, command: string) => Promise<void>;
  query: (name: string, command: string) => Promise<string>;
  read: (name: string) => Promise<string>;
  stb: (name: string) => Promise<number>;
}
