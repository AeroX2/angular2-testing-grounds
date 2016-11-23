"use strict";
var testing_1 = require('@angular/core/testing');
var core_1 = require('@angular/core');
var by_1 = require('@angular/platform-browser/src/dom/debug/by');
// Load the implementations that should be tested
var x_large_directive_1 = require('./x-large.directive');
describe('x-large directive', function () {
    // Create a test component to test directives
    var TestComponent = (function () {
        function TestComponent() {
        }
        TestComponent = __decorate([
            core_1.Component({
                template: '<div x-large>Content</div>'
            }), 
            __metadata('design:paramtypes', [])
        ], TestComponent);
        return TestComponent;
    }());
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                x_large_directive_1.XLarge,
                TestComponent
            ]
        });
    });
    it('should sent font-size to x-large', testing_1.fakeAsync(function () {
        testing_1.TestBed.compileComponents().then(function () {
            var fixture = testing_1.TestBed.createComponent(TestComponent);
            fixture.detectChanges();
            testing_1.tick();
            var element = fixture.debugElement.query(by_1.By.css('div'));
            expect(element.nativeElement.style.fontSize).toBe('x-large');
        });
    }));
});
//# sourceMappingURL=x-large.directive.spec.js.map