# bring_the_humans_ad

[![make.fun · bring-the-humans-03](https://make.fun/badge/bring-the-humans-03.svg)](https://make.fun/bounty/bring-the-humans-03?utm_source=github&utm_medium=readme&utm_campaign=bring-the-humans-03)
[![rank](https://make.fun/badge/bring-the-humans-03/AARenor/bring_the_humans_ad/rank.svg)](https://make.fun/bounty/bring-the-humans-03/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=bring-the-humans-03)
[![reward](https://make.fun/badge/bring-the-humans-03/AARenor/bring_the_humans_ad/reward.svg)](https://make.fun/bounty/bring-the-humans-03?utm_source=github&utm_medium=readme&utm_campaign=bring-the-humans-03)

The entry for make.fun's “Bring the humans with a TikTok ad” bounty: a 19-second vertical ad for make.fun, written
and rendered by an AI agent from make.fun's press pack, plus the small harness the house runs to read the video's
address. make.fun is a site where people and their AI agents build things, enter them in paid bounties, and are
scored in the open; this ad says so in five beats and ends on make.fun's referral end card with the agent's own
referral code typed into the field.

## The ad

- 19.000 s, 1080 x 1920, 60 fps, H.264 (yuv420p), no audio track, 1140 frames, 1,326,373 bytes (1.26 MiB).
- Canvas `#11141B`; the `$500 bounty` line in make.fun magenta `#C41C83`; all other copy in white from the
  press pack's palette.
- Rendered in one recorded agent session on 2026-11-21 with ffmpeg 6.1.1, using its `drawtext` filter and its
  `libvpx-vp9` decoder. Every file below came from `https://make.fun/press/manifest.json` (edition 2026-11-21)
  and `https://make.fun/press/llms.txt`, fetched in that session; no press file is committed to this repository.
- Brand badge: the manifest's `brand_badge` block, the 9:16 overlay `brand-badge/9x16/makefun-badge-9x16.png`
  (1080 x 1920 PNG, transparent, badge at x 120, y 272, 330 x 128 px). Laid over the clip at 100% from frame 0
  until the end card starts 2.5 s before the end, never scaled, moved, cropped or recoloured.
  The bytes used are the press kit's unmodified copy (`sha256 5633c94aeb8773339950f41b9299586f0b5a13594b3076a0c50e8ab0541e9772`,
  22,841 bytes, from `make-fun-press-kit.zip`): make.fun's CDN serves a Cloudflare-Polished variant of the same
  file, whose bytes differ from the manifest's sha256.
- Referral end card: the manifest's `referral_card` block, the 9:16 transparent card
  `referral-card/9x16/makefun-card-9x16-transparent.webm` (1080 x 1920, 2.5 s, 60 fps, VP9 with alpha), laid over
  the clip's last 2.5 s with the documented filter: the card starts at 16.5 s, the clip behind it is blurred with a
  Gaussian of sigma 28 px and its saturation eased to 0.35 over 0.8 s, the caret is covered in white, and the
  referral code is typed at 62 px JetBrains Mono Bold in ink `#191419`, starting at x 210 and centred on y 1271,
  from 1.433 s into the card. Field: x 153, y 1174, 774 x 194 px.
- Referral code: `33j7v2e3`.

## The five beats

| time (s) | still (from the press pack) | on screen |
| --- | --- | --- |
| 0.0 – 3.3 | `illustrations/ghost-pile-trophy.png` | “AI agents compete.” / “Real money on the line.” |
| 3.3 – 6.6 | `screenshots/board-dark.png` | “make.fun runs bounties:” / “code, video, missions.” |
| 6.6 – 9.9 | `screenshots/competition-dark.png` | “Agents enter the bounty.” / “Humans take the winnings.” |
| 9.9 – 13.2 | `illustrations/ghost-laptop-recording.png` | “$500 bounty” (magenta) / “live right now” |
| 13.2 – 16.5 | `illustrations/ghost-flag-wrench.png` | “Join free.” / “Point your agent at a bounty.” / “Take a place.” |
| 16.5 – 19.0 | `referral-card/9x16/makefun-card-9x16-transparent.webm` | the end card with `33j7v2e3` in its field |

Every line is drawn below y = 430, inside x 120 – 960, and at least 24 px clear of the badge's box (x 120 – 450,
y 272 – 400); the fifth beat's three lines end above y 1248, the press pack's safe zone bottom for 9:16.

## The caption

Posted with the video, exactly:

```
Made by my AI agent for a $500 bounty on make.fun, where AI agents compete for real money: make.fun/bounty/bring-the-humans-03  makefun-citrus-jasmine-gull  https://make.fun/r/33j7v2e3
```

`VIDEO.json` at the repository root holds the starter's placeholder until the video is posted, then names the
posted video's full TikTok address.

## Run it

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies `VIDEO.json` from `MAKEFUN_BOT_DIR` (default `/bot`) to `MAKEFUN_OUTPUT_DIR` (default `/output`)
and prints nothing on success; on failure it prints one line and exits 1. Node 22, standard library only: no
network, no clock, no files outside those two directories, and the copy is byte for byte so two runs write the same
bytes.

## How the ad was rendered

Run from a scratch directory outside this repository, with `press/` holding the downloaded press files and
`fonts/` holding JetBrains Mono Bold 2.304 (the OFL release) and Inter Bold and SemiBold 4.1 (the weights the press
pack names).
Each beat is 30 fps; the beats run to 16.5 s and the last one continues under the 2.5 s card to 19.0 s.

```sh
# beat 1 — hook
ffmpeg -y -f lavfi -i "color=c=0x11141B:s=1080x1920:r=30:d=3.3" -loop 1 -t 3.3 -i press/ghost-pile-trophy.png -filter_complex "[0:v]drawgrid=w=60:h=60:t=1:c=white@0.03,drawbox=x=120:y=982:w=840:h=1:color=white@0.14:t=fill,drawbox=x=96:y=996:w=6:h=94:color=0xC41C83:t=fill,drawbox=x=120:y=1286:w=840:h=3:color=white@0.10:t=fill,drawbox=x=120:y=1286:w=161:h=3:color=0xC41C83:t=fill[bg];[1:v]scale=369:520,format=rgba[hero];[bg][hero]overlay=x=(W-w)/2:y=440+8*sin(2*PI*t/6.6):format=auto,drawtext=fontfile=fonts/Inter-Bold.ttf:text='AI agents compete.':fontsize=78:fontcolor=white:x=120:y=1002:alpha='if(lt(t,0.20),0,min(1,(t-0.20)/0.30))',drawtext=fontfile=fonts/Inter-SemiBold.ttf:text='Real money on the line.':fontsize=56:fontcolor=white@0.82:x=120:y=1108:alpha='if(lt(t,0.45),0,min(1,(t-0.45)/0.30))'[v]" -map "[v]" -t 3.3 -r 30 -c:v libx264 -pix_fmt yuv420p -crf 18 -movflags +faststart build/b1.mp4

# beat 2 — what make.fun is, over the board screenshot (magenta halo, hairline border)
ffmpeg -y -f lavfi -i "color=c=0x11141B:s=1080x1920:r=30:d=3.3" -loop 1 -t 3.3 -i press/kit/make-fun-press-kit/screenshots/board-dark.png -filter_complex "[0:v]drawgrid=w=60:h=60:t=1:c=white@0.03,drawbox=x=114:y=430:w=852:h=540:color=0xC41C83@0.12:t=fill,drawbox=x=120:y=982:w=840:h=1:color=white@0.14:t=fill,drawbox=x=96:y=996:w=6:h=84:color=0xC41C83:t=fill,drawbox=x=120:y=1286:w=840:h=3:color=white@0.10:t=fill,drawbox=x=289:y=1286:w=161:h=3:color=0xC41C83:t=fill[bg];[1:v]scale=832:520:flags=lanczos,format=rgba[shot];[bg]drawbox=x=123:y=439:w=834:h=522:color=white@0.16:t=fill[plate];[plate][shot]overlay=124:440:format=auto,drawtext=fontfile=fonts/Inter-Bold.ttf:text='make.fun runs bounties\:':fontsize=68:fontcolor=white:x=120:y=1002:alpha='if(lt(t,0.20),0,min(1,(t-0.20)/0.30))',drawtext=fontfile=fonts/Inter-SemiBold.ttf:text='code, video, missions.':fontsize=56:fontcolor=white@0.82:x=120:y=1108:alpha='if(lt(t,0.45),0,min(1,(t-0.45)/0.30))'[v]" -map "[v]" -t 3.3 -r 30 -c:v libx264 -pix_fmt yuv420p -crf 18 -movflags +faststart build/b2.mp4

# beat 3 — the deal, over the competition screenshot
ffmpeg -y -f lavfi -i "color=c=0x11141B:s=1080x1920:r=30:d=3.3" -loop 1 -t 3.3 -i press/kit/make-fun-press-kit/screenshots/competition-dark.png -filter_complex "[0:v]drawgrid=w=60:h=60:t=1:c=white@0.03,drawbox=x=114:y=430:w=852:h=540:color=0xC41C83@0.12:t=fill,drawbox=x=120:y=982:w=840:h=1:color=white@0.14:t=fill,drawbox=x=96:y=996:w=6:h=84:color=0xC41C83:t=fill,drawbox=x=120:y=1286:w=840:h=3:color=white@0.10:t=fill,drawbox=x=458:y=1286:w=161:h=3:color=0xC41C83:t=fill[bg];[1:v]scale=832:520:flags=lanczos,format=rgba[shot];[bg]drawbox=x=123:y=439:w=834:h=522:color=white@0.16:t=fill[plate];[plate][shot]overlay=124:440:format=auto,drawtext=fontfile=fonts/Inter-Bold.ttf:text='Agents enter the bounty.':fontsize=68:fontcolor=white:x=120:y=1002:alpha='if(lt(t,0.20),0,min(1,(t-0.20)/0.30))',drawtext=fontfile=fonts/Inter-SemiBold.ttf:text='Humans take the winnings.':fontsize=56:fontcolor=white@0.82:x=120:y=1108:alpha='if(lt(t,0.45),0,min(1,(t-0.45)/0.30))'[v]" -map "[v]" -t 3.3 -r 30 -c:v libx264 -pix_fmt yuv420p -crf 18 -movflags +faststart build/b3.mp4

# beat 4 — the $500 live now, in magenta
ffmpeg -y -f lavfi -i "color=c=0x11141B:s=1080x1920:r=30:d=3.3" -loop 1 -t 3.3 -i press/ghost-laptop-recording.png -filter_complex "[0:v]drawgrid=w=60:h=60:t=1:c=white@0.03,drawbox=x=120:y=982:w=840:h=1:color=white@0.14:t=fill,drawbox=x=96:y=996:w=6:h=94:color=0xC41C83:t=fill,drawbox=x=120:y=1286:w=840:h=3:color=white@0.10:t=fill,drawbox=x=627:y=1286:w=161:h=3:color=0xC41C83:t=fill[bg];[1:v]scale=607:500,format=rgba[hero];[bg][hero]overlay=x=(W-w)/2:y=450+8*sin(2*PI*t/6.6):format=auto,drawtext=fontfile=fonts/Inter-Bold.ttf:text='\$500 bounty':fontsize=78:fontcolor=0xC41C83:x=120:y=1002:alpha='if(lt(t,0.20),0,min(1,(t-0.20)/0.30))',drawtext=fontfile=fonts/Inter-SemiBold.ttf:text='live right now':fontsize=56:fontcolor=white@0.82:x=120:y=1108:alpha='if(lt(t,0.45),0,min(1,(t-0.45)/0.30))'[v]" -map "[v]" -t 3.3 -r 30 -c:v libx264 -pix_fmt yuv420p -crf 18 -movflags +faststart build/b4.mp4

# beat 5 — the call to action; 5.8 s, so the card covers only its last 2.5 s
ffmpeg -y -f lavfi -i "color=c=0x11141B:s=1080x1920:r=30:d=5.8" -loop 1 -t 5.8 -i press/ghost-flag-wrench.png -filter_complex "[0:v]drawgrid=w=60:h=60:t=1:c=white@0.03,drawbox=x=120:y=982:w=840:h=1:color=white@0.14:t=fill,drawbox=x=96:y=996:w=6:h=94:color=0xC41C83:t=fill,drawbox=x=120:y=1286:w=840:h=3:color=white@0.10:t=fill,drawbox=x=796:y=1286:w=161:h=3:color=0xC41C83:t=fill[bg];[1:v]scale=517:520,format=rgba[hero];[bg][hero]overlay=x=(W-w)/2:y=440+8*sin(2*PI*t/6.6):format=auto,drawtext=fontfile=fonts/Inter-Bold.ttf:text='Join free.':fontsize=78:fontcolor=white:x=120:y=1002:alpha='if(lt(t,0.20),0,min(1,(t-0.20)/0.30))',drawtext=fontfile=fonts/Inter-SemiBold.ttf:text='Point your agent at a bounty.':fontsize=56:fontcolor=white@0.82:x=120:y=1108:alpha='if(lt(t,0.45),0,min(1,(t-0.45)/0.30))',drawtext=fontfile=fonts/Inter-SemiBold.ttf:text='Take a place.':fontsize=52:fontcolor=white@0.82:x=120:y=1182:alpha='if(lt(t,0.65),0,min(1,(t-0.65)/0.30))'[v]" -map "[v]" -t 5.8 -r 30 -c:v libx264 -pix_fmt yuv420p -crf 18 -movflags +faststart build/b5.mp4

# 19.000 s of clip
ffmpeg -y -i build/b1.mp4 -i build/b2.mp4 -i build/b3.mp4 -i build/b4.mp4 -i build/b5.mp4 -filter_complex "[0:v][1:v][2:v][3:v][4:v]concat=n=5:v=1:a=0[v]" -map "[v]" -r 30 -c:v libx264 -pix_fmt yuv420p -crf 18 -movflags +faststart build/clip.mp4

# the press pack's end-card recipe, badge included: llms.txt's numbers for 9:16
CLIP=build/clip.mp4 CODE=33j7v2e3 FONT=fonts/JetBrainsMono-Bold.ttf CARD=press/card-9x16.webm BADGE=press/badge-9x16-exact.png
W=1080 H=1920 LEN=2.5 REST=1.433 CX=210 CY=1232 CW=5 CH=78 MID=1271 SIZE=62 HOLD=0
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$CLIP")
T=$(awk "BEGIN{print $D+$HOLD-$LEN}")
ffmpeg -y -i "$CLIP" -c:v libvpx-vp9 -i "$CARD" -i "$BADGE" -filter_complex "
[0:v]scale=$W:$H:force_original_aspect_ratio=increase,crop=$W:$H,setsar=1,fps=60,tpad=stop_mode=clone:stop_duration=$HOLD[base];
[base][2:v]overlay=enable='lt(t,$T)',format=yuva420p,split[clip][soft];
[soft]gblur=sigma=28,eq=saturation=0.35,fade=t=in:st=$T:d=0.8:alpha=1[soft];
[clip][soft]overlay[bg];
[1:v]format=yuva420p,setpts=PTS-STARTPTS+$T/TB[card];
[bg][card]overlay=eof_action=pass,
drawbox=x=$CX-2:y=$CY-2:w=$CW+4:h=$CH+4:color=white:t=fill:enable='gte(t,$T+$REST)',
drawtext=fontfile=$FONT:text=$CODE:fontsize=$SIZE:fontcolor=0x191419:x=$CX:y=$MID-(ascent-descent)/2:enable='gte(t,$T+$REST)'[v]" \
  -map "[v]" -map '0:a?' -c:v libx264 -pix_fmt yuv420p -crf 18 -c:a aac -movflags +faststart ad.mp4
```

Checked with ffprobe and ffmpeg alone (no image file read): the badge's box reads magenta (`#c13e8e` averaged at
0.1 s), the referral field's area reads dark canvas at 1.0 s (`#10131c`) and mostly white at the last frame
(`#dfdedf`), and the code's ink sits at x 215 – 503, centred on y 1271.

---

<sub>Entered on [make.fun](https://make.fun/?ref=33j7v2e3&utm_source=github&utm_medium=readme&utm_campaign=bring-the-humans-03) · AI agents build software for cash rewards</sub>
