import { optimize } from 'svgo';
import fs from 'fs-extra';

export async function optimizeSvg(svgPath: string): Promise<string> {
  const svgContent = await fs.readFile(svgPath, 'utf8');
  
  const result = optimize(svgContent, {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            // Keep viewBox
            removeViewBox: false,
            // Keep IDs for accessibility
            cleanupIds: false,
            // Keep title and desc for accessibility
            removeTitle: false,
            removeDesc: false,
            // Keep metadata
            removeMetadata: false,
            // Keep comments
            removeComments: false,
            // Keep DOCTYPE
            removeDoctype: false,
            // Keep XML declaration
            removeXMLProcInst: false,
            // Keep xmlns
            removeXMLNS: false,
            // Keep unused defs
            removeUnusedNS: false,
            // Keep style attributes
            removeStyleElement: false,
            // Keep class attributes
            removeClass: false,
            // Keep data attributes
            removeDataAttrs: false,
            // Keep aria attributes
            removeAriaAttrs: false,
            // Keep role attributes
            removeRole: false,
            // Keep tabindex
            removeTabindex: false,
            // Keep focusable
            removeFocusable: false,
            // Keep hidden
            removeHidden: false,
            // Keep display
            removeDisplay: false,
            // Keep visibility
            removeVisibility: false,
            // Keep opacity
            removeOpacity: false,
            // Keep fill
            removeFill: false,
            // Keep stroke
            removeStroke: false,
            // Keep stroke-width
            removeStrokeWidth: false,
            // Keep stroke-linecap
            removeStrokeLinecap: false,
            // Keep stroke-linejoin
            removeStrokeLinejoin: false,
            // Keep stroke-miterlimit
            removeStrokeMiterlimit: false,
            // Keep stroke-dasharray
            removeStrokeDasharray: false,
            // Keep stroke-dashoffset
            removeStrokeDashoffset: false,
            // Keep stroke-opacity
            removeStrokeOpacity: false,
            // Keep fill-opacity
            removeFillOpacity: false,
            // Keep fill-rule
            removeFillRule: false,
            // Keep clip-rule
            removeClipRule: false,
            // Keep clip-path
            removeClipPath: false,
            // Keep mask
            removeMask: false,
            // Keep filter
            removeFilter: false,
            // Keep marker
            removeMarker: false,
            // Keep pattern
            removePattern: false,
            // Keep linearGradient
            removeLinearGradient: false,
            // Keep radialGradient
            removeRadialGradient: false,
            // Keep stop
            removeStop: false,
            // Keep defs
            removeDefs: false,
            // Keep use
            removeUse: false,
            // Keep symbol
            removeSymbol: false,
            // Keep switch
            removeSwitch: false,
            // Keep foreignObject
            removeForeignObject: false,
            // Keep image
            removeImage: false,
            // Keep text
            removeText: false,
            // Keep tspan
            removeTspan: false,
            // Keep textPath
            removeTextPath: false,
            // Keep tref
            removeTref: false,
            // Keep altGlyph
            removeAltGlyph: false,
            // Keep altGlyphDef
            removeAltGlyphDef: false,
            // Keep altGlyphItem
            removeAltGlyphItem: false,
            // Keep glyph
            removeGlyph: false,
            // Keep glyphRef
            removeGlyphRef: false,
            // Keep font
            removeFont: false,
            // Keep font-face
            removeFontFace: false,
            // Keep font-face-src
            removeFontFaceSrc: false,
            // Keep font-face-uri
            removeFontFaceUri: false,
            // Keep font-face-format
            removeFontFaceFormat: false,
            // Keep font-face-name
            removeFontFaceName: false,
            // Keep hkern
            removeHkern: false,
            // Keep vkern
            removeVkern: false,
            // Keep missing-glyph
            removeMissingGlyph: false,
            // Keep path
            removePath: false,
            // Keep rect
            removeRect: false,
            // Keep circle
            removeCircle: false,
            // Keep ellipse
            removeEllipse: false,
            // Keep line
            removeLine: false,
            // Keep polyline
            removePolyline: false,
            // Keep polygon
            removePolygon: false,
            // Keep g
            removeG: false,
            // Keep switch
            removeSwitch: false,
            // Keep foreignObject
            removeForeignObject: false,
            // Keep image
            removeImage: false,
            // Keep text
            removeText: false,
            // Keep tspan
            removeTspan: false,
            // Keep textPath
            removeTextPath: false,
            // Keep tref
            removeTref: false,
            // Keep altGlyph
            removeAltGlyph: false,
            // Keep altGlyphDef
            removeAltGlyphDef: false,
            // Keep altGlyphItem
            removeAltGlyphItem: false,
            // Keep glyph
            removeGlyph: false,
            // Keep glyphRef
            removeGlyphRef: false,
            // Keep font
            removeFont: false,
            // Keep font-face
            removeFontFace: false,
            // Keep font-face-src
            removeFontFaceSrc: false,
            // Keep font-face-uri
            removeFontFaceUri: false,
            // Keep font-face-format
            removeFontFaceFormat: false,
            // Keep font-face-name
            removeFontFaceName: false,
            // Keep hkern
            removeHkern: false,
            // Keep vkern
            removeVkern: false,
            // Keep missing-glyph
            removeMissingGlyph: false,
            // Keep path
            removePath: false,
            // Keep rect
            removeRect: false,
            // Keep circle
            removeCircle: false,
            // Keep ellipse
            removeEllipse: false,
            // Keep line
            removeLine: false,
            // Keep polyline
            removePolyline: false,
            // Keep polygon
            removePolygon: false,
            // Keep g
            removeG: false
          }
        }
      },
      // Custom plugins for Philippine government icons
      {
        name: 'removeDimensions',
        params: {
          removeWidth: true,
          removeHeight: true
        }
      },
      {
        name: 'addAttributesToSVGElement',
        params: {
          attributes: [
            {
              role: 'img',
              'aria-label': 'Philippine government icon'
            }
          ]
        }
      },
      {
        name: 'sortAttrs',
        params: {
          order: ['viewBox', 'xmlns', 'role', 'aria-label', 'class', 'id']
        }
      }
    ]
  });

  if (result.error) {
    throw new Error(`SVG optimization failed: ${result.error}`);
  }

  return result.data;
}
