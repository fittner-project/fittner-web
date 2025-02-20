//Object.getPrototypeOf(async function* () {});
type CoroutineIterator = () => any;
export default class Coroutine {
  job: any[];
  constructor() {
    this.job = [];
    //window.request
  }
  add(c: CoroutineIterator) {
    this.job.push(c());
  }
  clear() {
    this.job = [];
  }

  update(dt: number) {
    let i = 0;
    while (i < this.job.length) {
      let c = this.job[i];
      let done = c.next(dt).done;

      if (done) this.job.splice(i, 1);
      else i++;
    }
  }
  isRunning() {
    return this.job.length > 0;
  }
}

class _WaitForSeconds {
  durationSec: number;
  constructor(durationSec: number) {
    this.durationSec = durationSec;
  }
  *update() {
    var durationMs = this.durationSec * 1000;
    var startMs = Date.now();
    var dt = 0;
    while (Date.now() - startMs < durationMs) {
      dt = yield undefined;
    }
    return dt;
  }
}
class WaitUntil {}
class DoWhile {}

export const WaitForSeconds = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export type CancelablePromise<T> = {
  ps: Promise<T>;
  cancel: () => void;
};
export const CancelablePromiseImpl = <T>(
  promise: Promise<T>
): CancelablePromise<T> => {
  let cancel: () => void;
  const wrappedPromise = new Promise<T>((resolve, reject) => {
    cancel = () => reject("canceled");
    promise.then(resolve, reject);
  });
  return { ps: wrappedPromise, cancel: cancel! };
};
