"use strict";
exports.__esModule = true;
exports.Rank = exports.GameFlow = exports.LCUEvents = void 0;
var LCUEvents;
(function (LCUEvents) {
    LCUEvents["LCUConnected"] = "LCUConnected";
    LCUEvents["LCUClosed"] = "LCUClosed";
    LCUEvents["NeedLCU"] = "NeedLCU";
    LCUEvents["WindowClose"] = "WindowClose";
    LCUEvents["WindowMinimize"] = "WindowMinimize";
})(LCUEvents = exports.LCUEvents || (exports.LCUEvents = {}));
var GameFlow;
(function (GameFlow) {
    GameFlow[GameFlow["None"] = 0] = "None";
    GameFlow[GameFlow["Lobby"] = 1] = "Lobby";
    GameFlow[GameFlow["Matchmaking"] = 2] = "Matchmaking";
    GameFlow[GameFlow["ChampSelect"] = 3] = "ChampSelect";
    GameFlow[GameFlow["InProgress"] = 4] = "InProgress";
    GameFlow[GameFlow["WaitingForStats"] = 5] = "WaitingForStats";
    GameFlow[GameFlow["PreEndOfGame"] = 6] = "PreEndOfGame";
    GameFlow[GameFlow["EndOfGame"] = 7] = "EndOfGame";
})(GameFlow = exports.GameFlow || (exports.GameFlow = {}));
var Rank;
(function (Rank) {
    Rank[Rank["NONE"] = 0] = "NONE";
    Rank[Rank["IRON"] = 1] = "IRON";
    Rank[Rank["BRONZE"] = 2] = "BRONZE";
    Rank[Rank["SILVER"] = 3] = "SILVER";
    Rank[Rank["GOLD"] = 4] = "GOLD";
    Rank[Rank["PLATINUM"] = 5] = "PLATINUM";
    Rank[Rank["DIAMOND"] = 6] = "DIAMOND";
    Rank[Rank["MASTER"] = 7] = "MASTER";
    Rank[Rank["GRANDMASTER"] = 8] = "GRANDMASTER";
    Rank[Rank["CHALLENGER"] = 9] = "CHALLENGER";
})(Rank = exports.Rank || (exports.Rank = {}));
var enums = {
    LCUEvents: LCUEvents,
    GameFlow: GameFlow,
    Rank: Rank
};
exports["default"] = enums;
