import { Directive, Output, HostListener } from "@angular/core";
import { Subject, Observable, interval } from "rxjs";
import { EventEmitter } from "@angular/core";
import { takeUntil, tap, filter } from "rxjs/operators";

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: "[holdable]",
})
export class HoldableDirective {
  @Output() holdTime: EventEmitter<number> = new EventEmitter();
  state: Subject<string> = new Subject();
  cancel: Observable<string>;

  constructor() {
    this.cancel = this.state.pipe(
      filter((v) => v === "cancel"),
      tap((v) => {
        console.log("%c stopped hold", "color: #ec6969; font-weight: bold;");
        this.holdTime.emit(0);
      })
    );
  }

  @HostListener("mouseup", ["$event"])
  @HostListener("mouseleave", ["$event"])
  onExit() {
    this.state.next("cancel");
  }

  @HostListener("mousedown", ["$event"])
  onHold() {
    console.log("%c started hold", "color: #5fba7c; font-weight: bold");
    this.state.next("start");

    const n = 100;

    interval(n)
      .pipe(
        takeUntil(this.cancel),
        tap((v) => {
          this.holdTime.emit(v * n);
        })
      )
      .subscribe();
  }
}
