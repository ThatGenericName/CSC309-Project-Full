import {Stack} from "@mui/material";
import {SUBSCRIPTIONPROMOCONTENT} from "./PromoCardTexts";
import React from "react";
import {PromoCardItem} from "./PromoCardItem";

export function SubscriptionPromoCards(props) {
    const items = SUBSCRIPTIONPROMOCONTENT

    return (
        <Stack spacing={2} sx={{p: 2}}>
            {items.map((item, ind) =>
                <PromoCardItem
                    data={item}
                    left={ind % 2 == 0}
                />
            )}
        </Stack>
    )
}

