"use strict";

elementOpen("div");
elementOpen("div", "1", ["key", "1"]);
elementClose("div");
elementOpen("div", key, ["key", key]);
elementClose("div");
elementOpen("div", props.key, ["key", props.key]);
elementClose("div");
elementClose("div");
