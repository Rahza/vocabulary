import { VocabularyPair, LeitnerState } from "@/models/types";

export interface IVocabularyManagement {
  /**
   * Search and filter vocabulary items.
   */
  filterVocabulary(options: {
    query?: string;
    tags?: string[];
    minBox?: number;
    maxBox?: number;
  }): Promise<VocabularyPair[]>;

  /**
   * Resets the Leitner progress for a specific vocabulary item (both directions).
   */
  resetProgress(id: string): Promise<void>;

  /**
   * Deletes multiple vocabulary items at once.
   */
  bulkDelete(ids: string[]): Promise<void>;

  /**
   * Adds a tag to multiple vocabulary items.
   */
  bulkAddTag(ids: string[], tag: string): Promise<void>;

  /**
   * Removes a tag from multiple vocabulary items.
   */
  bulkRemoveTag(ids: string[], tag: string): Promise<void>;

  /**
   * Global tag management: Deletes a tag from all vocabulary items.
   */
  deleteTagGlobal(tagName: string): Promise<void>;

  /**
   * Global tag management: Renames a tag in all vocabulary items.
   */
  renameTagGlobal(oldName: string, newName: string): Promise<void>;
}
