### one-liner

**sidegate lets you drag any app into a private wireguard tunnel so only that traffic slips past censors while the rest of your mac stays raw.**

---

## hackclub 100h oss app description

> **what it is**
> sidegate is a tiny, fully open-source split-tunnel vpn for mac. drop an app or a domain onto the window and sidegate pushes just that traffic through an embedded wireguard interface. everything else keeps using the normal network.
>
> **why it exists**
> in turkey, iran, russia, and dozens of other regions, tools like discord, github, or notion are throttled or blocked outright. whole-device vpns are slow, raise flags, and burn battery. sidegate gives makers a stealth lane without blanketing the entire machine.
>
> **how it works**
>
> * swiftui menubar app
> * networkextension packet tunnel with `wireguard-go` compiled in
> * per-app rules via `NEAppRule` or per-domain rules via a local pac file
> * autosave config at `~/Library/Application Support/sidegate`
> * tunnel shuts down when the last target process quits
>
> **features v0.1**
>
> * drag-and-drop target picker
> * one-click connect and latency badge
> * signed, notarised universal binary
> * mit license, no telemetry
>
> **devlog checkpoints**
>
> 1. hour 01 – repo scaffold and drag-drop working
> 2. hour 12 – first wireguard handshake
> 3. hour 36 – discord split-tunnel demo gif
> 4. hour 60 – menubar polish and auto-update stub
> 5. hour 100 – notarised dmg, landing page live at sidegate.app

---

## `README.md` (drop this into the root)

````markdown
# sidegate

> drag any app into its own private wireguard tunnel. keep the rest of your mac on the raw network.

![screenshot](./assets/hero.png)

## why

in many countries a full-device vpn hurts speed, battery, and sometimes draws unwanted attention. sidegate lets you unblock just the tools you need, leaving everything else alone.

## branches

| branch | purpose |
| --- | --- |
| `main` | stable releases, tagged v0.x |
| `landing-page` | nextjs site that lives at https://sidegate.app |
| `macos-app` | swiftui source for the native menubar client |
| `dev` | scratch work merged into other branches when ready |

## features

- per-app split tunnelling with NetworkExtension
- embedded `wireguard-go`, no kernel install
- per-domain mode using a local PAC file
- latency badge and auto-stop on target exit
- config lives locally, never touches the cloud
- mit license

## quick start

```bash
# clone
git clone https://github.com/plawlabs/sidegate.git
cd sidegate

# build the mac client
git switch macos-app
open Sidegate.xcodeproj   # run in Xcode 15+

# run the landing page
git switch landing-page
pnpm i
pnpm dev
````

## roadmap

* [ ] auto-update with sparkle
* [ ] windows client using wintun
* [ ] linux cli
* [ ] hosted exit-node network and paid plans
* [ ] team dashboard with device inventory

## contributing

pull requests and issue reports are welcome. check `/CONTRIBUTING.md` for setup and coding style.

## license

sidegate is released under the MIT license. see `LICENSE` for details.
