import type { Book, SectionSummary } from './book.type';
import type { SectionData } from '../ast/ast.types';
/** 책 목록 조회용 (간략) */
export type BookListItem = Pick<Book, 'book_idx' | 'creator_idx' | 'status' | 'book_title' | 'book_language' | 'book_level' | 'book_cover_url' | 'genre' | 'word_count' | 'section_count' | 'created_at' | 'updated_at'> & {
    creator_name?: string;
};
/** 책 상세 응답 (메타 + 요약 + 콘텐츠) */
export type BookDTO = {
    meta: Book;
    summary: {
        sectionOrder: string[];
        sections: SectionSummary[];
    };
    content: SectionData[];
};
