import {
  type PlaceAutocompleteResponse,
  type PlaceDetailsResponse,
} from "@googlemaps/google-maps-services-js";

export const AutocompleteResult: PlaceAutocompleteResponse["data"] = {
  predictions: [
    {
      description:
        "YELLOW DAY COFFEE ROASTERS, Bridge Street, Lidcombe NSW, Australia",
      matched_substrings: [
        {
          length: 10,
          offset: 0,
        },
      ],
      place_id: "ChIJD2Tl7d69EmsRfL3LNbUVzkE",
      reference: "ChIJD2Tl7d69EmsRfL3LNbUVzkE",
      structured_formatting: {
        main_text: "YELLOW DAY COFFEE ROASTERS",
        main_text_matched_substrings: [
          {
            length: 10,
            offset: 0,
          },
        ],
        secondary_text: "Bridge Street, Lidcombe NSW, Australia",
      },
      terms: [
        {
          offset: 0,
          value: "YELLOW DAY COFFEE ROASTERS",
        },
        {
          offset: 28,
          value: "Bridge Street",
        },
        {
          offset: 43,
          value: "Lidcombe",
        },
        {
          offset: 52,
          value: "NSW",
        },
        {
          offset: 57,
          value: "Australia",
        },
      ],
      types: ["cafe", "food", "point_of_interest", "establishment"],
    },
    {
      description:
        "Australia, New South Wales, Lidcombe, Bridge Street, Yellow Day Internet Cafe",
      matched_substrings: [
        {
          length: 10,
          offset: 53,
        },
      ],
      place_id: "ChIJYQCjq-u9EmsR38ELuKnr0dQ",
      reference: "ChIJYQCjq-u9EmsR38ELuKnr0dQ",
      structured_formatting: {
        main_text: "Yellow Day Internet Cafe",
        main_text_matched_substrings: [
          {
            length: 10,
            offset: 0,
          },
        ],
        secondary_text: "Australia, New South Wales, Lidcombe, Bridge Street",
      },
      terms: [
        {
          offset: 53,
          value: "Yellow Day Internet Cafe",
        },
        {
          offset: 38,
          value: "Bridge Street",
        },
        {
          offset: 28,
          value: "Lidcombe",
        },
        {
          offset: 11,
          value: "New South Wales",
        },
        {
          offset: 0,
          value: "Australia",
        },
      ],
      types: ["point_of_interest", "establishment"],
    },
  ],
  status: "OK",
};

export const PlaceDetailResult: PlaceDetailsResponse["data"] = {
  html_attributions: [],
  result: {
    address_components: [
      {
        long_name: "18",
        short_name: "18",
        types: ["street_number"],
      },
      {
        long_name: "Bridge Street",
        short_name: "Bridge St",
        types: ["route"],
      },
      {
        long_name: "Lidcombe",
        short_name: "Lidcombe",
        types: ["locality", "political"],
      },
      {
        long_name: "Cumberland City Council",
        short_name: "Cumberland City Council",
        types: ["administrative_area_level_2", "political"],
      },
      {
        long_name: "New South Wales",
        short_name: "NSW",
        types: ["administrative_area_level_1", "political"],
      },
      {
        long_name: "Australia",
        short_name: "AU",
        types: ["country", "political"],
      },
      {
        long_name: "2141",
        short_name: "2141",
        types: ["postal_code"],
      },
    ],
    adr_address:
      '<span class="street-address">18 Bridge St</span>, <span class="locality">Lidcombe</span> <span class="region">NSW</span> <span class="postal-code">2141</span>, <span class="country-name">Australia</span>',
    business_status: "OPERATIONAL",
    current_opening_hours: {
      open_now: true,
      periods: [
        {
          close: {
            date: "2022-12-05",
            day: 1,
            time: "0000",
          },
          open: {
            date: "2022-12-04",
            day: 0,
            time: "0500",
          },
        },
        {
          close: {
            date: "2022-12-06",
            day: 2,
            time: "0000",
          },
          open: {
            date: "2022-12-05",
            day: 1,
            time: "0500",
          },
        },
        {
          close: {
            date: "2022-12-07",
            day: 3,
            time: "0000",
          },
          open: {
            date: "2022-12-06",
            day: 2,
            time: "0500",
          },
        },
        {
          close: {
            date: "2022-12-07",
            day: 3,
            time: "2359",
            truncated: true,
          },
          open: {
            date: "2022-12-07",
            day: 3,
            time: "0500",
          },
        },
        {
          close: {
            date: "2022-12-02",
            day: 5,
            time: "0000",
          },
          open: {
            date: "2022-12-01",
            day: 4,
            time: "0500",
          },
        },
        {
          close: {
            date: "2022-12-03",
            day: 6,
            time: "0000",
          },
          open: {
            date: "2022-12-02",
            day: 5,
            time: "0500",
          },
        },
        {
          close: {
            date: "2022-12-04",
            day: 0,
            time: "0000",
          },
          open: {
            date: "2022-12-03",
            day: 6,
            time: "0500",
          },
        },
      ],
      weekday_text: [
        "Monday: 5:00 AM – 12:00 AM",
        "Tuesday: 5:00 AM – 12:00 AM",
        "Wednesday: 5:00 AM – 12:00 AM",
        "Thursday: 5:00 AM – 12:00 AM",
        "Friday: 5:00 AM – 12:00 AM",
        "Saturday: 5:00 AM – 12:00 AM",
        "Sunday: 5:00 AM – 12:00 AM",
      ],
    },
    delivery: true,
    dine_in: true,
    formatted_address: "18 Bridge St, Lidcombe NSW 2141, Australia",
    formatted_phone_number: "0426 521 004",
    geometry: {
      location: {
        lat: -33.8641318,
        lng: 151.0430091,
      },
      viewport: {
        northeast: {
          lat: -33.8629090197085,
          lng: 151.0442032802915,
        },
        southwest: {
          lat: -33.8656069802915,
          lng: 151.0415053197085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",
    icon_background_color: "#FF9E67",
    icon_mask_base_uri:
      "https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet",
    international_phone_number: "+61 426 521 004",
    name: "YELLOW DAY COFFEE ROASTERS",
    opening_hours: {
      open_now: true,
      periods: [
        {
          close: {
            day: 1,
            time: "0000",
          },
          open: {
            day: 0,
            time: "0500",
          },
        },
        {
          close: {
            day: 2,
            time: "0000",
          },
          open: {
            day: 1,
            time: "0500",
          },
        },
        {
          close: {
            day: 3,
            time: "0000",
          },
          open: {
            day: 2,
            time: "0500",
          },
        },
        {
          close: {
            day: 4,
            time: "0000",
          },
          open: {
            day: 3,
            time: "0500",
          },
        },
        {
          close: {
            day: 5,
            time: "0000",
          },
          open: {
            day: 4,
            time: "0500",
          },
        },
        {
          close: {
            day: 6,
            time: "0000",
          },
          open: {
            day: 5,
            time: "0500",
          },
        },
        {
          close: {
            day: 0,
            time: "0000",
          },
          open: {
            day: 6,
            time: "0500",
          },
        },
      ],
      weekday_text: [
        "Monday: 5:00 AM – 12:00 AM",
        "Tuesday: 5:00 AM – 12:00 AM",
        "Wednesday: 5:00 AM – 12:00 AM",
        "Thursday: 5:00 AM – 12:00 AM",
        "Friday: 5:00 AM – 12:00 AM",
        "Saturday: 5:00 AM – 12:00 AM",
        "Sunday: 5:00 AM – 12:00 AM",
      ],
    },
    photos: [
      {
        height: 4032,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/110224750000454668394">Gautam R</a>',
        ],
        photo_reference:
          "AW30NDzxcdG0-Y9wf3Quw_ZizlNirZLjOeh6zSSDogpUINnSQ3yMQ-QLr078O-9xo5qBXNqmQYGTZz75T0x3YmP_s-8PUYx_Cem7CGzdixZk4p5cSDh9MrJZK1SOSikbbekHwSlKkIYfSjxLpj3XzacrI_dAoIuEWn10y8mDCx10FY_g_2xY",
        width: 3024,
      },
      {
        height: 3024,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/100209458093802197345">Sammy Lau</a>',
        ],
        photo_reference:
          "AW30NDzy9_ZHRucGtTBwiVFELff5YlXqNHMukkDkgTQyz8Aape6xvpYOUaWvt0B-LSUMD2oFBGfBTMXoySWQUzchpK6G5BJYYB0Vwoy_qs7zOJQi1rlCpkjwJpF2HxsussQEpKHIFvAjbSfLfC3JMMe6xUKNvw4ZmtyggIBr5VdMf9oe8Nw",
        width: 4032,
      },
      {
        height: 3024,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/106905225698760043032">Melinda Muyargas</a>',
        ],
        photo_reference:
          "AW30NDwDVpORUysaQj6BVFZrV0ccz0dilSkSJoMXkcwjOIu9Oc-qu_vdksArz8iQaPB03dOQ1M67_8sXKn4O-ahdZ0STRVpwW_xETC4zqYmokT8He2jAjiZKaBqVQLNy1NcrnVDkpvrM4C84T2tN_Yme1Z0Dz5lsg5ZSMIX3gmtoi5XZOsSE",
        width: 4032,
      },
      {
        height: 4032,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/110224750000454668394">Gautam R</a>',
        ],
        photo_reference:
          "AW30NDxxeNPiaOrZVMHZaVBnknjZuFZewSsGXBpR8OdSZrEQMruSy-c1_S7rLpBQX9K2ttGRy6cCmjQCzWNso6pzMb83r2BKVqE9pFRuE68fZxMTtKT42rSNj-2qSzUALwuhYgnO0P9ucESl3EXWi_laXzcPMY3_TL4voGUJJswBM1TL1X8J",
        width: 3024,
      },
      {
        height: 4032,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/100209458093802197345">Sammy Lau</a>',
        ],
        photo_reference:
          "AW30NDz42vDXb99rEmCkBjOR7tK6lrP02kuvGDWxtRO1X4jzPnAW4i7XDsEaJ4_thCsaA6PfVj_W__3CfP8mOnMFNmTW2KQvJk6HF35--K11PifsBAFY9hEKEIWjMLW96sJQOGA-W9toGlXbaErvPRM2nWPDX-KpwhKYk6XiKJZ_72_RWoo",
        width: 3024,
      },
      {
        height: 4032,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/100209458093802197345">Sammy Lau</a>',
        ],
        photo_reference:
          "AW30NDy2-0pD7WgjN3INrYcqkkk_MFOvpLP3Sg6vuW4VMV_31OGJF1qmLIDjOdDmOzau9GigcyD_3lsDT6gFgdl-wCfOKJAym1AB91DEakNMrJV3J-WdZ8Dc8R02B7CbRpbCd6yne_e4m3BZZGUiSn6Rpm-gmlEPdcLnbKb5uo0ABlnHl_w",
        width: 3024,
      },
      {
        height: 4032,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/115088860074013325917">Oodorii Oodorii</a>',
        ],
        photo_reference:
          "AW30NDzWGzd-10lV-BZrdeQtEO-lDYBaxFwrMQAFm4csJ30ldv066EHuJOXcVnMQYwVvfys25rp6RlNFHnLX7IE0khZl9ufYJisCYaMR9bSBiOLHo9_oVLPepIrqSr3TU9GIqrkOfcpGplbPAyOsMv_otXNn9cT6mjf6mpUy1xgq8tGGA-3D",
        width: 3024,
      },
      {
        height: 4032,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/117497725308129800590">GaRam Han</a>',
        ],
        photo_reference:
          "AW30NDxl2hrrB30FBLjv9mfS1c0qLnmvRujFimgAKr5sISLlk1H9o5CcQMYrBFn6S0ORe0spovO95xvfG_LNKFm79BqigCF3iotVLBdPcIc7u-rGs4EBNKO_H9KLZg6gvyleBzdFjqXytG2JIIyFno4-UQFLb1QNcYKwXzIb3GPjrYasUb7w",
        width: 3024,
      },
      {
        height: 4032,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/100829141322693236246">Emilie Tran</a>',
        ],
        photo_reference:
          "AW30NDw15S2VJWIONR9jVEinZkgFRylR9ZCOrt-bR2S8Yc107Ri_kG7wBRchWZGhMtqS1vP-U5-a0ch4h03cSM05WjOe2Vs7aPLZOkRQn4UjWUR1tCw7RQsDWAeq0DrSKcBuDitxYGvcGTUXnrVBgYCt7Fpo2-UIe3PgxMVxm3MNqXCStRc7",
        width: 3024,
      },
      {
        height: 3472,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/112987608718533107269">Lovely Stella PARK</a>',
        ],
        photo_reference:
          "AW30NDy2tiCCQnwhXbcZVOLIYo07Mlw6_nuzitR3GeVmwW41K24uwgwAtCmCHFPEUduFLAq0kXZj-9iFCY8C-hOQrZ9cT3iGrW8naENH25hByOU96QCDau2SISCtC1wWSgn40kAPs-gO9esoIb8CxPpIg-PE9k0rYlo-8dK7jjGXS1CCbhlG",
        width: 3472,
      },
    ],
    place_id: "ChIJD2Tl7d69EmsRfL3LNbUVzkE",
    plus_code: {
      compound_code: "42PV+86 Lidcombe NSW, Australia",
      global_code: "4RRH42PV+86",
    },
    rating: 4.8,
    reference: "ChIJD2Tl7d69EmsRfL3LNbUVzkE",
    reviews: [
      {
        author_name: "Gautam R",
        author_url:
          "https://www.google.com/maps/contrib/110224750000454668394/reviews",
        language: "en",
        original_language: "en",
        profile_photo_url:
          "https://lh3.googleusercontent.com/a/ALm5wu1Ao9-8gth013tTBUAea5qVQfCqM6W_Cv4yAsd0=s128-c0x00000000-cc-rp-mo-ba4",
        rating: 4,
        relative_time_description: "8 months ago",
        text: "This is a quiet place but they serve delicious coffee and waffles.\nI love the coffee here, I drink only black coffee and i enjoy medium roast.\nThis is probably once of the places around Lidcombe that perfectly roast the beans and always deliver tasty coffee. Most places around here serve bitter coffee as beans are burnt.\nI love it and its always good to be here.\nThe building is under construction and it could be a bit hard to find this place.\nIt’s opposite to Lidcombe public library",
        time: 1646610409,
        translated: false,
      },
      {
        author_name: "Irune As",
        author_url:
          "https://www.google.com/maps/contrib/109587724548511907687/reviews",
        language: "en",
        original_language: "en",
        profile_photo_url:
          "https://lh3.googleusercontent.com/a-/ACNPEu86uNe28YU_EueJtxqWXz0osxmv-WJTFc5EyZ-A0g=s128-c0x00000000-cc-rp-mo-ba4",
        rating: 5,
        relative_time_description: "5 months ago",
        text: "my favourite place!\ntoasts are super tasty, scones and bagels are nice too 🥰\nstaff are so so friendly.. they remember your preferences and always try to make things in a way you requested (e.g. hc with oatmilk • 1/4 strength - an annoying customer 🥺)\n\nIt'a a nice place to chill at night and come to do a bit of paperwork during day time 😎\nCafe does get very crowded at times.\n\nFYI, they have pc bang and coin-operated karaoke machines upstairs.",
        time: 1654697891,
        translated: false,
      },
      {
        author_name: "Sammy Lau",
        author_url:
          "https://www.google.com/maps/contrib/100209458093802197345/reviews",
        language: "en",
        original_language: "en",
        profile_photo_url:
          "https://lh3.googleusercontent.com/a-/ACNPEu8gsnlG-4WFeDLgbJcm94oysAmuT_HUqiUgbh70=s128-c0x00000000-cc-rp-mo-ba3",
        rating: 5,
        relative_time_description: "3 weeks ago",
        text: "What a great found in Lidcombe ! Superb coffee, they know their beans and Benedict is great for Mike based coffee, I can choose beans for my flatty. Nice service, everyone came here if they after great cup, policemen are daily customers.",
        time: 1667618645,
        translated: false,
      },
      {
        author_name: "Marwa El jamaly",
        author_url:
          "https://www.google.com/maps/contrib/100196757013011935525/reviews",
        language: "en",
        original_language: "en",
        profile_photo_url:
          "https://lh3.googleusercontent.com/a/ALm5wu2N9GIWLZk9UeyoVr1JeQnn78ytkDGX2Hxc0gRy=s128-c0x00000000-cc-rp-mo",
        rating: 5,
        relative_time_description: "3 months ago",
        text: "Amazing! I am here every other day. The upstairs is a beautiful vintage study room with serene music in background. The staff are so friendly and have exceptional customer service. Nice food. Today, when I couldn’t drink the iced tea due to being too sweet, they exchanged it for another drink with no problems. Check it out!",
        time: 1661483139,
        translated: false,
      },
      {
        author_name: "Emilie Tran",
        author_url:
          "https://www.google.com/maps/contrib/100829141322693236246/reviews",
        language: "en",
        original_language: "en",
        profile_photo_url:
          "https://lh3.googleusercontent.com/a-/ACNPEu-2-pxMwKvH_3GEVzQm0Ozb2Vl1GIT5ZulGsMfl5A=s128-c0x00000000-cc-rp-mo",
        rating: 5,
        relative_time_description: "8 months ago",
        text: "Been to Lidcome several times but didn’t know this shop. Nice service with great coffee. Unique flavour. Ihave tried both Halle Berry and Benedict blends, they’re both lovely.\nWaffle w ice cream was yumm too!!\nGreat work guys, will come back for a coffee anytime I go to Lidcome",
        time: 1648436514,
        translated: false,
      },
    ],
    serves_beer: false,
    serves_breakfast: true,
    serves_brunch: true,
    serves_wine: false,
    takeout: true,
    types: ["cafe", "food", "point_of_interest", "establishment"],
    url: "https://maps.google.com/?cid=4741751325703519612",
    user_ratings_total: 92,
    utc_offset: 660,
    vicinity: "18 Bridge Street, Lidcombe",
    website: "http://yellowdaycoffeeroasters.com.au/",
    wheelchair_accessible_entrance: true,
  },
  status: "OK",
};
