module PF6.Charts.Internal.Color exposing (hexToRgba, withAlpha)

{-| Internal color utilities. Not part of the public API.
-}


{-| Convert a 6-digit hex color string and an opacity Float to an
`rgba(r,g,b,a)` CSS string. Required because SVG `fill` does not support
hex colors with alpha (`#rrggbbaa` is not universally supported in SVG 1.1).

    hexToRgba "#0066cc" 0.15 == "rgba(0,102,204,0.15)"

-}
hexToRgba : String -> Float -> String
hexToRgba hex opacity =
    let
        h =
            if String.startsWith "#" hex then
                String.dropLeft 1 hex

            else
                hex

        rStr =
            String.left 2 h

        gStr =
            String.slice 2 4 h

        bStr =
            String.slice 4 6 h

        hexDigit : Char -> Int
        hexDigit c =
            if c >= '0' && c <= '9' then
                Char.toCode c - Char.toCode '0'

            else if c >= 'a' && c <= 'f' then
                Char.toCode c - Char.toCode 'a' + 10

            else if c >= 'A' && c <= 'F' then
                Char.toCode c - Char.toCode 'A' + 10

            else
                0

        parseByte : String -> Int
        parseByte s =
            case String.toList s of
                [ hi, lo ] ->
                    hexDigit hi * 16 + hexDigit lo

                _ ->
                    0

        r =
            parseByte rStr

        g =
            parseByte gStr

        b =
            parseByte bStr

        -- Round alpha to avoid floating-point noise in output
        alphaStr =
            String.fromFloat (toFloat (round (opacity * 100)) / 100)
    in
    "rgba("
        ++ String.fromInt r
        ++ ","
        ++ String.fromInt g
        ++ ","
        ++ String.fromInt b
        ++ ","
        ++ alphaStr
        ++ ")"


{-| Apply opacity to a hex color, returning an rgba string.

Alias for `hexToRgba`.

-}
withAlpha : Float -> String -> String
withAlpha opacity hex =
    hexToRgba hex opacity
