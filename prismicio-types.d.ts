// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

type EventDocumentDataSlicesSlice = never;

/**
 * Content for Event documents
 */
interface EventDocumentData {
  /**
   * Event Title field in *Event*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: event.event_title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  event_title: prismic.RichTextField;

  /**
   * Event Start Date field in *Event*
   *
   * - **Field Type**: Date
   * - **Placeholder**: *None*
   * - **API ID Path**: event.event_start_date
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#date
   */
  event_start_date: prismic.DateField;

  /**
   * Event End Date field in *Event*
   *
   * - **Field Type**: Date
   * - **Placeholder**: *None*
   * - **API ID Path**: event.event_end_date
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#date
   */
  event_end_date: prismic.DateField;

  /**
   * Eventfrog Link field in *Event*
   *
   * - **Field Type**: Link
   * - **Placeholder**: TICKETS
   * - **API ID Path**: event.eventfrog_link
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  eventfrog_link: prismic.LinkField;

  /**
   * Event Image field in *Event*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: event.event_image
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  event_image: prismic.ImageField<never>;

  /**
   * Event Location field in *Event*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Miake Izakaya
   * - **API ID Path**: event.event_location
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  event_location: prismic.RichTextField;

  /**
   * Event Street field in *Event*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Sempacherstrasse 153
   * - **API ID Path**: event.event_street
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  event_street: prismic.RichTextField;

  /**
   * Event Postcode and City field in *Event*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: CH - 4053 Basel
   * - **API ID Path**: event.event_postcode_and_city
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  event_postcode_and_city: prismic.RichTextField;

  /**
   * Event Description field in *Event*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Japanische Kulinarik kennt viele Aromen und Geschmäcker. Eine davon ist jedoch so präsent
   * - **API ID Path**: event.event_description
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  event_description: prismic.KeyTextField;

  /**
   * Slice Zone field in *Event*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: event.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<EventDocumentDataSlicesSlice> /**
   * Meta Title field in *Event*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: event.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Event*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: event.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Event*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: event.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * Event document from Prismic
 *
 * - **API ID**: `event`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type EventDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<Simplify<EventDocumentData>, "event", Lang>;

/**
 * Content for Logo documents
 */
interface LogoDocumentData {
  /**
   * Logo Image field in *Logo*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: logo.logo_image
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  logo_image: prismic.ImageField<never>;
}

/**
 * Logo document from Prismic
 *
 * - **API ID**: `logo`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type LogoDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<Simplify<LogoDocumentData>, "logo", Lang>;

type PageDocumentDataSlicesSlice = BasicSliceSlice;

/**
 * Content for Page documents
 */
interface PageDocumentData {
  /**
   * Slice Zone field in *Page*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: page.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<PageDocumentDataSlicesSlice> /**
   * Meta Title field in *Page*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: page.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Page*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: page.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Page*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: page.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * Page document from Prismic
 *
 * - **API ID**: `page`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PageDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<Simplify<PageDocumentData>, "page", Lang>;

/**
 * Item in *Settings → Navigation Items*
 */
export interface SettingsDocumentDataNavigationItemsItem {
  /**
   * Navigation Item field in *Settings → Navigation Items*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.navigation_items[].navigation_item
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  navigation_item: prismic.LinkField;

  /**
   * Navigation Active Image field in *Settings → Navigation Items*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.navigation_items[].navigation_active_image
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  navigation_active_image: prismic.ImageField<never>;
}

/**
 * Item in *Settings → Navigation Social Icons*
 */
export interface SettingsDocumentDataNavigationSocialIconsItem {
  /**
   * Socials Link field in *Settings → Navigation Social Icons*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.navigation_social_icons[].socials_link
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  socials_link: prismic.LinkField;

  /**
   * Socials Icon field in *Settings → Navigation Social Icons*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.navigation_social_icons[].socials_icon
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  socials_icon: prismic.ImageField<never>;
}

/**
 * Item in *Settings → Navigation Address*
 */
export interface SettingsDocumentDataNavigationAddressItem {
  /**
   * Address Line field in *Settings → Navigation Address*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.navigation_address[].address_line
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  address_line: prismic.RichTextField;
}

/**
 * Content for Settings documents
 */
interface SettingsDocumentData {
  /**
   * Page Title field in *Settings*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Konomi
   * - **API ID Path**: settings.page_title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  page_title: prismic.RichTextField;

  /**
   * Page Subtitle Date field in *Settings*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: 30.3 - 5.4.2025
   * - **API ID Path**: settings.page_subtitle_date
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  page_subtitle_date: prismic.RichTextField;

  /**
   * Navigation Items field in *Settings*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.navigation_items[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  navigation_items: prismic.GroupField<
    Simplify<SettingsDocumentDataNavigationItemsItem>
  >;

  /**
   * Navigation Social Icons field in *Settings*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.navigation_social_icons[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  navigation_social_icons: prismic.GroupField<
    Simplify<SettingsDocumentDataNavigationSocialIconsItem>
  >;

  /**
   * Navigation Address field in *Settings*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.navigation_address[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  navigation_address: prismic.GroupField<
    Simplify<SettingsDocumentDataNavigationAddressItem>
  >;
}

/**
 * Settings document from Prismic
 *
 * - **API ID**: `settings`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SettingsDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<SettingsDocumentData>,
    "settings",
    Lang
  >;

export type AllDocumentTypes =
  | EventDocument
  | LogoDocument
  | PageDocument
  | SettingsDocument;

/**
 * Item in *BasicSlice → Schedule → Primary → Event*
 */
export interface BasicSliceSliceSchedulePrimaryEventItem {
  /**
   * Event Name field in *BasicSlice → Schedule → Primary → Event*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Sake Trinken
   * - **API ID Path**: basic_slice.schedule.primary.event[].event_name
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  event_name: prismic.RichTextField;

  /**
   * Event Date field in *BasicSlice → Schedule → Primary → Event*
   *
   * - **Field Type**: Date
   * - **Placeholder**: *None*
   * - **API ID Path**: basic_slice.schedule.primary.event[].event_date
   * - **Documentation**: https://prismic.io/docs/field#date
   */
  event_date: prismic.DateField;

  /**
   * Eventfrog Link field in *BasicSlice → Schedule → Primary → Event*
   *
   * - **Field Type**: Link
   * - **Placeholder**: Mehr
   * - **API ID Path**: basic_slice.schedule.primary.event[].eventfrog_link
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  eventfrog_link: prismic.LinkField;
}

/**
 * Primary content in *BasicSlice → Default → Primary*
 */
export interface BasicSliceSliceDefaultPrimary {
  /**
   * Heading field in *BasicSlice → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: basic_slice.default.primary.heading
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  heading: prismic.RichTextField;

  /**
   * Japanese Subtitle First field in *BasicSlice → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: 好み [ko|noː|mi] --
   * - **API ID Path**: basic_slice.default.primary.japanese_subtitle_first
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  japanese_subtitle_first: prismic.RichTextField;

  /**
   * Japanese Subtitles Second field in *BasicSlice → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: dt.: "Geschmack"
   * - **API ID Path**: basic_slice.default.primary.japanese_subtitles_second
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  japanese_subtitles_second: prismic.RichTextField;

  /**
   * Text field in *BasicSlice → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Konomi ist das Festival japanischen Geschmacks in Basel.
   * - **API ID Path**: basic_slice.default.primary.text
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  text: prismic.RichTextField;
}

/**
 * Default variation for BasicSlice Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type BasicSliceSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<BasicSliceSliceDefaultPrimary>,
  never
>;

/**
 * Primary content in *BasicSlice → Schedule → Primary*
 */
export interface BasicSliceSliceSchedulePrimary {
  /**
   * Heading field in *BasicSlice → Schedule → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: basic_slice.schedule.primary.heading
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  heading: prismic.RichTextField;

  /**
   * Japanese Subtitles First field in *BasicSlice → Schedule → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: 食べる [ta|be|ru] --
   * - **API ID Path**: basic_slice.schedule.primary.japanese_subtitles_first
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  japanese_subtitles_first: prismic.RichTextField;

  /**
   * Japanese Subtitle Second field in *BasicSlice → Schedule → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: dt.: "essen"
   * - **API ID Path**: basic_slice.schedule.primary.japanese_subtitle_second
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  japanese_subtitle_second: prismic.RichTextField;

  /**
   * Text field in *BasicSlice → Schedule → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Konomi ist das Festival japanischen Geschmacks in Basel.
   * - **API ID Path**: basic_slice.schedule.primary.text
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  text: prismic.RichTextField;

  /**
   * Program Heading field in *BasicSlice → Schedule → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Programm
   * - **API ID Path**: basic_slice.schedule.primary.program_heading
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  program_heading: prismic.RichTextField;

  /**
   * Program text field in *BasicSlice → Schedule → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: In unserem Programm findest du genaue Details über Veranstaltungen
   * - **API ID Path**: basic_slice.schedule.primary.program_text
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  program_text: prismic.RichTextField;

  /**
   * Event field in *BasicSlice → Schedule → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: basic_slice.schedule.primary.event[]
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  event: prismic.GroupField<Simplify<BasicSliceSliceSchedulePrimaryEventItem>>;

  /**
   * More Events Link field in *BasicSlice → Schedule → Primary*
   *
   * - **Field Type**: Link
   * - **Placeholder**: Mehr Events
   * - **API ID Path**: basic_slice.schedule.primary.more_events_link
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  more_events_link: prismic.LinkField;
}

/**
 * Schedule variation for BasicSlice Slice
 *
 * - **API ID**: `schedule`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type BasicSliceSliceSchedule = prismic.SharedSliceVariation<
  "schedule",
  Simplify<BasicSliceSliceSchedulePrimary>,
  never
>;

/**
 * Primary content in *BasicSlice → Who is Konomi → Primary*
 */
export interface BasicSliceSliceWhoIsKonomiPrimary {
  /**
   * Heading field in *BasicSlice → Who is Konomi → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: basic_slice.whoIsKonomi.primary.heading
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  heading: prismic.RichTextField;

  /**
   * Japanese Subtitles First field in *BasicSlice → Who is Konomi → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: チーム [chi|mu] --
   * - **API ID Path**: basic_slice.whoIsKonomi.primary.japanese_subtitles_first
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  japanese_subtitles_first: prismic.RichTextField;

  /**
   * Japanese Subtitles Second field in *BasicSlice → Who is Konomi → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: dt.: "Team"
   * - **API ID Path**: basic_slice.whoIsKonomi.primary.japanese_subtitles_second
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  japanese_subtitles_second: prismic.RichTextField;

  /**
   * Text field in *BasicSlice → Who is Konomi → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Konomi ist das Festival japanischen Geschmacks in Basel.
   * - **API ID Path**: basic_slice.whoIsKonomi.primary.text
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  text: prismic.RichTextField;

  /**
   * Memberpage Link field in *BasicSlice → Who is Konomi → Primary*
   *
   * - **Field Type**: Link
   * - **Placeholder**: Erfahren Sie mehr über die Mitglieder
   * - **API ID Path**: basic_slice.whoIsKonomi.primary.memberpage_link
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  memberpage_link: prismic.LinkField;
}

/**
 * Who is Konomi variation for BasicSlice Slice
 *
 * - **API ID**: `whoIsKonomi`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type BasicSliceSliceWhoIsKonomi = prismic.SharedSliceVariation<
  "whoIsKonomi",
  Simplify<BasicSliceSliceWhoIsKonomiPrimary>,
  never
>;

/**
 * Primary content in *BasicSlice → Why Konomi → Primary*
 */
export interface BasicSliceSliceWhyKonomiPrimary {
  /**
   * Heading field in *BasicSlice → Why Konomi → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: basic_slice.whyKonomi.primary.heading
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  heading: prismic.RichTextField;

  /**
   * Japanese Subtitle First field in *BasicSlice → Why Konomi → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: 好み [ko|noː|mi] --
   * - **API ID Path**: basic_slice.whyKonomi.primary.japanese_subtitle_first
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  japanese_subtitle_first: prismic.RichTextField;

  /**
   * Text field in *BasicSlice → Why Konomi → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Konomi ist das Festival japanischen Geschmacks in Basel.
   * - **API ID Path**: basic_slice.whyKonomi.primary.text
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  text: prismic.RichTextField;

  /**
   * Last title field in *BasicSlice → Why Konomi → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: 好み [ko|noː|mi] -- dt.: "Geschmack"
   * - **API ID Path**: basic_slice.whyKonomi.primary.last_title
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  last_title: prismic.RichTextField;

  /**
   * Japanese Subtitles Second field in *BasicSlice → Why Konomi → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: dt.: "Geschmack"
   * - **API ID Path**: basic_slice.whyKonomi.primary.japanese_subtitles_second
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  japanese_subtitles_second: prismic.RichTextField;
}

/**
 * Why Konomi variation for BasicSlice Slice
 *
 * - **API ID**: `whyKonomi`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type BasicSliceSliceWhyKonomi = prismic.SharedSliceVariation<
  "whyKonomi",
  Simplify<BasicSliceSliceWhyKonomiPrimary>,
  never
>;

/**
 * Slice variation for *BasicSlice*
 */
type BasicSliceSliceVariation =
  | BasicSliceSliceDefault
  | BasicSliceSliceSchedule
  | BasicSliceSliceWhoIsKonomi
  | BasicSliceSliceWhyKonomi;

/**
 * BasicSlice Shared Slice
 *
 * - **API ID**: `basic_slice`
 * - **Description**: BasicSlice
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type BasicSliceSlice = prismic.SharedSlice<
  "basic_slice",
  BasicSliceSliceVariation
>;

/**
 * Primary content in *RichText → Default → Primary*
 */
export interface RichTextSliceDefaultPrimary {
  /**
   * Content field in *RichText → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Lorem ipsum...
   * - **API ID Path**: rich_text.default.primary.content
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  content: prismic.RichTextField;
}

/**
 * Default variation for RichText Slice
 *
 * - **API ID**: `default`
 * - **Description**: RichText
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type RichTextSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<RichTextSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *RichText*
 */
type RichTextSliceVariation = RichTextSliceDefault;

/**
 * RichText Shared Slice
 *
 * - **API ID**: `rich_text`
 * - **Description**: RichText
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type RichTextSlice = prismic.SharedSlice<
  "rich_text",
  RichTextSliceVariation
>;

declare module "@prismicio/client" {
  interface CreateClient {
    (
      repositoryNameOrEndpoint: string,
      options?: prismic.ClientConfig,
    ): prismic.Client<AllDocumentTypes>;
  }

  interface CreateWriteClient {
    (
      repositoryNameOrEndpoint: string,
      options: prismic.WriteClientConfig,
    ): prismic.WriteClient<AllDocumentTypes>;
  }

  interface CreateMigration {
    (): prismic.Migration<AllDocumentTypes>;
  }

  namespace Content {
    export type {
      EventDocument,
      EventDocumentData,
      EventDocumentDataSlicesSlice,
      LogoDocument,
      LogoDocumentData,
      PageDocument,
      PageDocumentData,
      PageDocumentDataSlicesSlice,
      SettingsDocument,
      SettingsDocumentData,
      SettingsDocumentDataNavigationItemsItem,
      SettingsDocumentDataNavigationSocialIconsItem,
      SettingsDocumentDataNavigationAddressItem,
      AllDocumentTypes,
      BasicSliceSlice,
      BasicSliceSliceDefaultPrimary,
      BasicSliceSliceSchedulePrimaryEventItem,
      BasicSliceSliceSchedulePrimary,
      BasicSliceSliceWhoIsKonomiPrimary,
      BasicSliceSliceWhyKonomiPrimary,
      BasicSliceSliceVariation,
      BasicSliceSliceDefault,
      BasicSliceSliceSchedule,
      BasicSliceSliceWhoIsKonomi,
      BasicSliceSliceWhyKonomi,
      RichTextSlice,
      RichTextSliceDefaultPrimary,
      RichTextSliceVariation,
      RichTextSliceDefault,
    };
  }
}
