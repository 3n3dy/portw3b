"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var useCustomCursor_1 = require("@/hooks/useCustomCursor");
var Header_1 = require("@/components/Header");
var Hero_1 = require("@/components/sections/Hero");
var Projects_1 = require("@/components/sections/Projects");
var About_1 = require("@/components/sections/About");
var Contact_1 = require("@/components/sections/Contact");
var Footer_1 = require("@/components/Footer");
function App() {
    // Кастомний курсор — лайм крапка + кільце
    (0, useCustomCursor_1.useCustomCursor)();
    return (<div className="noise">
      <Header_1.default />
      <main>
        <Hero_1.default />
        <Projects_1.default />
        <About_1.default />
        <Contact_1.default />
      </main>
      
      <Footer_1.default />
    </div>);
}
exports.default = App;
