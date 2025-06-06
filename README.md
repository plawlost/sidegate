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
