# Layout repair — verified for release

Updated 7 September 2026. The preview access issue is resolved and the responsive repair has completed its browser release checks.

## Implemented

- Consolidated all active `.rl-*` homepage rules into `app/reference-home.css`; removed competing rules from `globals.css`.
- Checked source dimensions for all eleven campaign assets and used intrinsic-ratio hero frames with uncropped images.
- Replaced the subdivided project image grid with a full-photo magazine sequence. Mobile retains a two-column spread: a narrow title column, framed photographs and paper edges. Images use contain sizing so complete subjects stay visible.
- Removed scroll-driven project switching, the selector's mount-time `scrollIntoView`, and 3D spread rotation.
- Made project buttons explicitly selected, added a hero motion pause control, and retained reduced-motion support.
- Rebalanced section typography, spacing, and mobile folder content.

## Verified

- Production build and artifact validation passed.
- Five rendered-route and source-regression tests passed.
- Source asset dimensions match the hero dimension map.
- Source diff has no whitespace errors.

## Browser verification

- Checked `/`, `/work`, `/capabilities`, `/studio`, `/contact` and `/privacy` at 360, 390, 430, 768, 1024 and 1440px browser viewport widths. All 36 final checks returned no document overflow or overflowing headings, paragraphs, project labels, folder titles and footer wordmark. Checked child bounds as well as document width.
- Visually reviewed the desktop, tablet and mobile hero, mobile project presentation, services, process, studio, menu, proof panel, Work and Contact entrances. Photos keep their original proportions; central products remain visible.
- Exercised all eleven photograph selections and confirmed every campaign asset loads. The main frame remains stable across selections.
- Verified all five `/capabilities` panels expand with visible content and positive measured height. Their height updates directly rather than animating through a blank intermediate state.
- Opened the homepage folders and visually confirmed the expanded description; checked the performance panel opens, loads its proof image and closes.
- Verified the hero pause button pauses both tracks. Reduced-motion handling remains in CSS and `useReducedMotion`; OS preference emulation was not available in this browser API.
- Verified the menu's high-contrast logo, focus wrapping, Escape dismissal, focus return, and Contact navigation.

Browser checks used Chrome with responsive iframe viewports; they are not a physical iOS/Safari test. Do not claim universal device coverage or guaranteed absence of all future issues.

## Additional fixes found during verification

- Gave the mobile slogan deliberate three-line breaks and reduced desktop hero height.
- Corrected clipped Studio closing and Privacy headings at phone widths.
- Made project selector labels more readable and removed cramped word spacing.
- Applied uncropped framing to Pie Bar on the Work page and removed excessive fixed-height copy areas.
- Resolved project-wide type checking by correcting the legacy match-media type and generating the matching Cloudflare runtime declarations. The optional D1 type preserves the existing runtime guard; no database capability was enabled.

## Complete visual review and magazine refinement

- Reviewed the full length of all six public pages at phone and desktop sizes, including the footer, not just their opening viewports.
- Rechecked all three magazine spreads at 360, 390 and 430px and the tablet spread at 768px. All eleven photographs were inspected as full-frame selections. The Anagen bottle, hair textures, portraits, Vonne garments and fur bag, and Pie Bar bottles remain visible without image stretching.
- Made the individual blue swimwear photograph the Vonne lead; retained the nine-image campaign board as a selectable plate. Shortened project notes to fit the magazine column and gave titles deliberate word breaks.
- Fixed the Work index image frames shrinking off-centre when their maximum height applied.
- Increased small labels and metadata, improved placeholder and footer-label contrast, restored consistent menu-button outlines, and corrected cramped footer and page-heading letter spacing.
- Visually rechecked all four homepage folders and all five Capabilities panels while expanded. Checked the open performance proof and the longest Contact form option at 360px.
- Fixed the landscape index clipping its lower links with a compact two-column menu. Verified the 844 × 390 landscape layout and the 360 × 640 portrait menu, as well as desktop navigation.
- Repeated the 36 route/width checks after the shared sizing changes: no document overflow or overflowing tested headings, body text, labels, form controls or wordmarks. The subsequent magazine checks also returned no overflowing copy or unloaded lead images.
- Preserved the approved hero, existing journal hold, and the distinction between Creative Pie's own-channel performance result and client campaign work.

The temporary local iframe review page is removed from the production artifact. These checks cover the rendered Chrome layouts and interactions described above, not a physical Safari device run.

## Automatic campaign plates

- Replaced the thumbnail picker with an automatic sequence inside each selected campaign. The frame stays fixed while a paper-edge wipe reveals the next complete photograph; no image scaling, slicing or 3D distortion is applied.
- Each plate receives a 6.2-second interval, including the 0.9-second transition. The small folio track shows progress. A persistent pause control and optional next-page button remain available without requiring interaction to see the campaign.
- Playback waits until the photo frame is visible and the next asset is loaded. It suspends outside the viewport, behind the open index and in hidden browser tabs; hover, touch hold and keyboard reading also pause it. Reduced-motion preference disables autoplay and the wipe.
- Observed all three campaigns advancing and looping without photo selections in the mobile browser review. Their measured spread heights stayed constant through the sequence. Confirmed explicit pause/resume and that opening the index holds the current plate.
- Reviewed the automatic spread at desktop width and retained the established uncropped image framing. Updated the existing rendered-route regression to require the autoplay control and reject the old thumbnail-picker labels.

## 15 September 2026 — campaign spreads and laptop fitting

Supersedes the single-photo sequence and contain-frame treatment described above.

- One authored magazine spread per brand, using all eleven campaign assets at their natural proportions. No letterboxed slideshow frame or per-photo picker.
- Named Anagen Paris, Vonne X2X and Pie Bar controls remain together above the spread with previous/next, explicit pause and a progress indicator. Whole projects advance every 6.5 seconds while visible. Mouse hover does not stop the hero or projects.
- Results are an explicit lime “View before & after” card with a visible views label, separate from client campaign attribution. The native modal supports Escape, close button, focus return and body scroll locking.
- Reduced excess laptop spacing; the truck and its four process steps share a desktop composition. Mobile process steps use a compact two-column layout. Short laptop hero has larger natural-ratio photo rows, with its supporting text beside the slogan.

### Browser evidence for this revision

- Selected Work reviewed at 1280×720, 1440×900, 1024×768, 390×844 and 360×640 in responsive Chrome iframe viewports. At the three laptop/desktop sizes the heading, three projects, arrows, magazine and results card fit below the header together. At 390px the card also fits; at 360×640 the complete magazine and controls are together and the card follows directly below. Content is allowed to scroll rather than being clipped to force a screen height.
- Inspected every brand spread across the desktop/mobile review, with full bottles, people, garments and fur bag visible. The rendered aspect-ratio comparison differed from source proportions only by subpixel rounding. No unloaded active campaign images or overflowing tested copy/controls were found.
- Observed project autoplay advancing and looping, then explicit pause holding the current project and resume advancing again. Verified real pointer selection does not scroll the page. Both hero tracks remained running while the pointer rested over them.
- Inspected the results modal at desktop and mobile. Verified native focus, Escape dismissal, focus return to the results button and restored page scrolling.
- Visually checked compact laptop hero, desktop/mobile truck composition and mobile whole-home copy bounds. The change is scoped to the homepage; existing other-route regression checks remain in the production build.

These are responsive Chrome checks, not a physical MacBook or iOS/Safari certification. No universal device guarantee is implied. The temporary review harness is excluded from production.

Release gate for this revision: Sites production build, ESM Worker/artifact validation and all five rendered-route regression checks passed.

## 15 September 2026 — larger desktop media and continuous campaign panels

Supersedes the preceding hero and loose campaign collage treatment.

- Desktop uses one taller filmstrip containing eleven unique photographs in an interleaved sequence. Phone layouts retain the two opposing rows. Both use two complete loop sets and an exact half-track translation. The duplicate Pie Bar image was removed from the mobile source sequence.
- Hero frame widths follow the original photo ratios. The visible brand-name caption was removed; a labelled 44px pause/play icon replaces the text control.
- Desktop magazines use adjoining, full-height native-ratio panels: pale sage for Anagen, an ink-black spine for Vonne and a pink–lavender–pink Pie Bar triptych. Sequential whole-photo reveals replace the loose print arrangement.
- Tablet places the copy above the photo strip. Phone layouts keep compact, brand-specific groupings. Pie Bar has a large paired portrait and two closer product portraits; the latter crop lower clothing while retaining faces and juice bottles.
- Project timing uses elapsed time rather than a capped per-frame increment, so lower frame rates do not stretch the 6.5-second reading interval. Offscreen, hidden-tab, keyboard-reading, touch-hold and reduced-motion guards remain.

### Checks completed before release

- Visually reviewed all three desktop spreads at 1280×720, including original image proportions, complete products and copy bounds. The section fits below the header together at this laptop size.
- Reviewed the 390×844 hero and Anagen/Pie Bar magazines, Vonne at 360×640, the 768×900 tablet strip, and Vonne at 1024×768. No document overflow or overflowing tested copy was found. At 360×640 the magazine and controls fit together; the results card follows below the fold.
- Reviewed the 1920×1080 hero and Vonne spread through a scaled responsive iframe. Six distinct hero frames were visible, with no simultaneous duplicate; the unique loop length exceeded the viewport. The full desktop magazine and results action fit together.
- Confirmed all active campaign images load, full-photo desktop ratios agree with their source proportions within subpixel rounding, pause stops hero tracks, and resume restores motion. Observed Vonne advance automatically to Pie Bar after the elapsed-time correction, with photos loaded and settled reveals.
- Browser review uses responsive Chrome iframes, not physical iOS/Safari devices. Unrelated pages and modal behavior were not redesigned in this revision; the existing production route checks remain required.
- Temporary review harness is removed before packaging.

Release gate: Sites production build, ESM Worker/artifact validation and all five rendered-route regression checks passed for this revision.

## 15 September 2026 — final service wording and real BTS photograph

- Removed the hero pause icon and its state/styles at the owner's request; preserved reduced-motion behavior and the Selected Work playback controls.
- Replaced the homepage Studio photograph with the supplied real BTS image, exported as WebP at its original 1536×2048 resolution. Used a 50%/65% focal position to keep the model and studio lights visible in the existing mobile and desktop frames.
- Renamed the two service folders to Content Creation + SMM and Branding. Explained social media management in full, with content calendars, shoots, editing, publishing and account management; clarified brand identity deliverables. Aligned the Services page and contact-form choices.
- Added full-service, social-first marketing agency positioning to the existing hero introduction and Studio page. Kept the slogan, approved page design and campaign presentation intact.
- Visually reviewed the BTS framing at 390×844 and 1280×720, the expanded content folder at 1280×720 and 360×640, and the expanded Services page at 360×640. Tested folder content opens and found no horizontal document or folder-copy overflow at the checked widths. Type checking passed. Temporary review page is excluded from production.

Release gate: production build, Worker validation and all five route/regression checks passed.


## 2026-09-21 — Scroll-driven service folders

- Replaced homepage click accordion with native sticky sheets inspired by the supplied Services Section Animation pin. Existing service copy, colours and folder silhouettes retained.
- Browser checked at 1363×936 and 1280×720: headings accumulate while following sheets cover preceding bodies. Last sheet and process handoff remain in normal page flow.
- Browser checked at 390×844 and 320×568: full description remains readable; short viewport uses compact tab offsets. Reverse scroll restores previous contents.
- Actual heading and card heights are remeasured after fonts/content resize. Oversized content falls back to normal flow; reduced-motion CSS and unenhanced HTML expose all content.
- Read-only second review caught and corrected a duplicate section heading ID.
- No other section, image or route changed. Temporary responsive preview harness removed before packaging.
- Final exit check found and fixed same-bottom compression with measured sticky slots; subsequent desktop and mobile renders retained the heading offsets through the section handoff.
