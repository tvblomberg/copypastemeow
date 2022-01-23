import { app, Tray, Menu, clipboard, globalShortcut } from "electron";
import Repo from "./Clipboard/Repos/clipboard-repo";
import * as path from "path";
import { IClipItem } from "./Clipboard/Models/clipitem";
import { v4 as guid } from "uuid";

const identityId = guid();

const onClick = (clipItem: IClipItem) => () =>
    clipboard.writeText(clipItem.value);

const onCopy = (tray: Tray) => async () => {
    const value = clipboard.readText("selection");

    if (value) {
        await Repo.createAsync(identityId, value);

        await buildContextMenu(tray);
    }
};

const buildContextMenu = async (tray: Tray) => {
    const now = new Date();
    const items = await Repo.getAllAsync(now, now, 10);
    const menuItems = items.map((x) => ({
        label: x.value.substring(0, 50),
        click: onClick(x),
    }));

    const contextMenu = Menu.buildFromTemplate([
        ...menuItems,
        { label: "Separator", type: "separator" },
        { label: "Quit", click: () => app.quit() },
    ]);

    tray.setContextMenu(contextMenu);
};

const onReady = () => {
    const title = "Copy Paste Meow Meow";

    const tray = new Tray(
        path.join(__dirname, "Public", "Images", "kitty.png")
    );

    tray.setTitle(title);
    tray.setToolTip(title);

    globalShortcut.register("CmdOrCtrl+c", onCopy(tray));

    return buildContextMenu(tray);
};

app.on("ready", onReady);
