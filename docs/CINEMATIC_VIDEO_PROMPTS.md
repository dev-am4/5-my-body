# 5 MY BODY — CINEMATIC VIDEO PROMPT PACK

เป้าหมาย: สร้างวิดีโอที่ต่อกันเป็นประสบการณ์เดียว ไม่ให้รู้สึกว่าเป็น UI หรือคลิปแยกชิ้น

## MASTER LOOK — ใช้กับทุกคลิป

**Image / Start-frame prompt**

> A premium cinematic science-museum projection of a full-body young human figure standing upright at the exact center of a 16:9 frame, facing forward in a calm neutral pose, entire body visible from head to feet. Deep black infinite environment, sophisticated biomedical visualization, natural human exterior with elegant semi-transparent internal anatomy visible in subtle layers: softly beating heart, branching blood vessels, lungs expanding gently, faint neural activity in the brain, digestive system, microscopic cellular particles. Advanced volumetric medical scan aesthetic, scientifically inspired, realistic materials, cinematic depth, deep blacks, restrained cyan light with natural warm red and amber biological highlights. Large negative space around the body for projection. Camera completely locked, symmetrical composition, no camera shake, no text, no labels, no logo, no interface, no HUD, no watermark, no extra limbs, no anatomy distortion. Museum-grade immersive visual, high contrast, 4K.

**Global motion rule**

> Keep the same person, same face, same body proportions, same clothing/body treatment, same camera, same lens, same lighting direction and same background in every shot. Movement must be slow, controlled and physically believable. No morphing between identities. No scene cut. No sudden camera move. Preserve the exact final frame for use as the next shot reference.

---

# 00 — IDLE LOOP

**Duration target:** 10–14 s, seamless loop

> Static locked camera. The full-body human remains perfectly centered. Natural breathing only. A soft volumetric scan slowly travels through the body. The heart pulses naturally, faint blood flow travels through vessels, the lungs gently expand and contract, subtle neural impulses glow inside the brain, tiny cellular particles drift slowly around the body. Different anatomical layers softly reveal and fade without abrupt transitions. Elegant, mysterious and inviting. The first and last frame must visually match for a seamless museum idle loop. No text, no interface, no camera movement.

**สำคัญ:** Export frame กลาง/ปลายที่นิ่งที่สุดเป็น `MASTER_IDLE_REFERENCE.png` ใช้เป็น start frame ของทุก `*_IN`.

---

# 01 — BRAIN

## 01_BRAIN_IN

**Start frame:** MASTER_IDLE_REFERENCE
**Duration target:** 4–6 s

> Continue from the exact idle frame. A subtle pulse rises from below the frame into the body, travels upward through the spine and reaches the head. The brain gradually illuminates with delicate cyan electrical activity. As the neural glow intensifies, the full human figure smoothly glides toward the left side of frame while remaining the exact same size, identity and lighting. Do not cut. Do not zoom. Keep the movement elegant and continuous. By the final frame, the human occupies the left third of the image and a luminous neural network has begun to grow into the center and right side, leaving a clean central storytelling area. Preserve the final frame exactly for the next shot.

## 01_BRAIN_LOOP

**Start frame:** last frame of BRAIN_IN
**Duration target:** 10–14 s seamless loop

> Keep the human fixed on the left third. The brain remains illuminated. A beautiful three-dimensional neural network fills the center of frame, with controlled electrical impulses travelling between neurons. Subtle visual connections extend from the brain toward the heart, hands and facial region, suggesting the relationship between brain, emotion, behavior and body. The central neural motion must be readable but not chaotic. No camera movement. The beginning and ending state must match for a seamless loop.

## 01_BRAIN_OUT

**Start frame:** a clean frame from BRAIN_LOOP
**Duration target:** 4–6 s

> Reverse the visual journey naturally, not as an obvious video rewind. Neural activity gently contracts back toward the brain, the network fades into darkness, the body smoothly glides from the left third back to the exact center position. The brain glow softens into the same subtle internal-anatomy state as the idle scene. Final frame must match MASTER_IDLE_REFERENCE as closely as possible. Locked camera, no cut.

---

# 02 — HEART / BODY

## 02_HEART_IN

> Continue from MASTER_IDLE_REFERENCE. A visible but elegant heartbeat pulse begins in the chest. With each beat, warm red light travels through major blood vessels across the body. The circulation becomes increasingly clear while the same human smoothly glides to the left third of frame. In the center, flowing red blood cells and branching vessels expand into a cinematic scientific visualization. Final frame becomes the reference for HEART_LOOP. No cut, locked camera.

## 02_HEART_LOOP

> Human remains on the left third with the heart softly beating. The center is filled with realistic cinematic blood-flow visualization: red blood cells moving through arteries, capillaries and veins, oxygen delivery suggested through subtle color and light changes. Add restrained skeletal-muscle and joint motion overlays to connect circulation with movement and physical rehabilitation. Seamless loop, no text, no camera movement.

## 02_HEART_OUT

> Circulation visualization gently contracts from the center back into the body. Vessel glow reduces to the subtle idle state. Human glides smoothly from the left third back to exact center. Final frame matches MASTER_IDLE_REFERENCE. No cut.

---

# 03 — DIGESTION

## 03_DIGESTION_IN

> Continue from MASTER_IDLE_REFERENCE. A warm amber trace begins at the mouth and travels naturally down the esophagus into the stomach. The digestive tract becomes visible in an elegant semi-transparent medical visualization. The human glides smoothly to the left third. At center, the view opens into a clean cinematic visualization of digestion and nutrient breakdown without gore, without cartoon styling. Preserve final frame.

## 03_DIGESTION_LOOP

> Human fixed on the left. Center visualization shows food particles breaking into smaller nutrient molecules, movement through the stomach and small intestine, and nutrients passing through the intestinal wall into the bloodstream. Show absorption as elegant luminous particles entering capillaries. Scientifically inspired, family-friendly, sophisticated museum visual. Seamless loop, locked camera.

## 03_DIGESTION_OUT

> Nutrient particles and digestive visualization contract back toward the body. The digestive glow softens. Human returns smoothly to exact center position. Final frame matches MASTER_IDLE_REFERENCE.

---

# 04 — PUBLIC HEALTH

## 04_PUBLIC_HEALTH_IN

> Continue from MASTER_IDLE_REFERENCE. A soft transparent protective field expands around the human body. Tiny airborne particles and simplified microscopic pathogens appear in the surrounding space. The human glides smoothly to the left third. The center expands from one individual into a cinematic network of people, clean water, air, hand hygiene and environmental protection represented visually, not as icons or text. Preserve final frame.

## 04_PUBLIC_HEALTH_LOOP

> Human remains left. Center shows the invisible pathways by which respiratory droplets, contaminated hands, surfaces, water and air can connect people, while layers of prevention interrupt those pathways. Use light barriers, clean-water flow and spatial separation as visual metaphors. Avoid fear or disease imagery. Sophisticated public-health systems visualization, seamless loop, locked camera.

## 04_PUBLIC_HEALTH_OUT

> Community network and airborne pathways gently dissolve. Protective field contracts back toward the individual. Human glides back to exact center. Final frame matches MASTER_IDLE_REFERENCE.

---

# 05 — CELLS / DNA

## 05_DNA_IN

> Continue from MASTER_IDLE_REFERENCE. A soft scan moves across the body and focuses into the skin and blood. Without moving the camera, create the visual impression of diving through layers of tissue using volumetric compositing: body to tissue to cells to a cell nucleus to DNA. At the same time, the full human smoothly glides to the left third and remains visible as the macro reference. The center fills with a spectacular microscopic cell and DNA environment. Preserve final frame.

## 05_DNA_LOOP

> Human stays left while the center shows a realistic cinematic microscopic environment: living cells, nucleus, chromosomes and DNA double helix, with subtle laboratory-analysis light patterns and sample particles. Show information becoming measurable data through abstract but scientifically restrained light patterns, not a sci-fi HUD. Seamless loop, no text, locked camera.

## 05_DNA_OUT

> Microscopic world collapses smoothly from DNA to nucleus to cell to tissue and back into the full human body. The figure glides from the left third to exact center. Final frame matches MASTER_IDLE_REFERENCE.

---

# NEGATIVE PROMPT / CONSISTENCY BLOCK

Append this to every generation when the model supports negative prompting:

> no text, no subtitle, no logo, no watermark, no UI, no HUD, no medical dashboard, no floating labels, no camera shake, no fast zoom, no scene cut, no identity change, no face change, no extra arms, no extra fingers, no duplicated body, no distorted anatomy, no horror, no gore, no surgery, no cartoon, no anime, no oversaturated neon, no random background change, no morphing clothes, no body proportion change

---

# GOOGLE FLOW WORKFLOW

1. Generate one high-quality MASTER body image first.
2. Create `00_IDLE_LOOP` from that image.
3. Export a clean idle frame as `MASTER_IDLE_REFERENCE.png`.
4. For each topic, generate `*_IN` using MASTER_IDLE_REFERENCE as the starting image.
5. Export the exact last frame of `*_IN`.
6. Use that last frame as start image for `*_LOOP`.
7. Make LOOP visually cyclical; choose matching first/last frames in Premiere if needed.
8. Use a clean LOOP frame as start image for `*_OUT`.
9. Force `*_OUT` to end on MASTER_IDLE_REFERENCE composition.
10. Export all final clips as H.264 MP4, CFR 30 fps, then place them in `/public/media/` using the exact filenames in `public/media/README.md`.

# EDITING NOTE

Do not rely on AI generation alone for the final 2–4 frames of a join. In Premiere, trim each boundary on matching motion, then use a very short 2–4 frame dissolve only when needed. The web player already performs an additional ~360 ms A/B opacity crossfade while the incoming clip is playing, so visual discontinuities should be hidden rather than exposed.
