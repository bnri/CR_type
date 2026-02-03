/** TTS 설정 (섹션 레벨) */
export type AudioMeta = {
    provider: 'AWS' | 'GCP';
    language?: string;
    engine?: string;
    voiceName?: string;
    voiceGender?: 'Male' | 'Female';
};
/** 섹션 요약 (snake_case — MongoDB/API 공용) */
export interface SectionSummary {
    section_id: string;
    title: string;
    order: number;
    audio_count: number;
    image_count: number;
    quiz_count: number;
    word_count: number;
    sound_minutes?: number;
    is_added_split?: boolean;
    is_added_audio?: boolean;
    is_added_quiz?: boolean;
    updated_at?: string;
    ast_cdn_url?: string;
    audio_meta?: AudioMeta;
}
/** MongoDB book_sections 문서 1:1 */
export interface BookSectionsDoc {
    book_idx: number;
    section_order: string[];
    sections: SectionSummary[];
    free_section_ids: string[] | null;
    created_at: string;
    updated_at: string;
}
