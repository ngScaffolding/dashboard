import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { WidgetModelBase, WidgetTypes } from '@ngscaffolding/models';
import { Observable } from 'rxjs';
import { WidgetService, WidgetQuery } from '@ngscaffolding/core';

@Component({
    selector: 'ngs-gallery',
    templateUrl: 'gallery.component.html',
    styleUrls: ['gallery.component.scss']
})
export class GalleryComponent implements OnChanges {
    @Input() galleryName: string;
    @Output() addWidget = new EventEmitter<string>();

    widgets$: Observable<WidgetModelBase[]>;

    constructor(public widgetService: WidgetService, public widgetQuery: WidgetQuery) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.galleryName.currentValue) {
            this.widgets$ = this.widgetQuery.selectAll({
                filterBy: widget =>
                    !widget.galleryName || widget.galleryName === '' || widget.galleryName === changes.galleryName.currentValue
            });
        }
    }

    clickWidget(name: string) {
        this.addWidget.emit(name);
    }

    getIconName(widget: WidgetModelBase) {
        if (widget.galleryIcon) {
            return widget.galleryIcon;
        } else {
            switch (widget.type) {
                case WidgetTypes.Chart: {
                    return 'pi pi-chart-bar';
                }
                case WidgetTypes.GridView: {
                    return 'pi pi-list';
                }
                default: {
                    return 'pi pi-image';
                }
            }
        }
    }
}
