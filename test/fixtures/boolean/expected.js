"use strict";

elementOpen("div");
elementVoid("input", null, ["disabled", true]);
elementVoid("input", null, null, "disabled", false);
elementClose("div");
