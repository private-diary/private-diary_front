"use client";

import { useEffect, useState } from "react";
import SearchCardView from "@/app/components/shared/search-card-view";

import { ZoneMainProps, ZoneSearchCardProps } from "@/types/zone.type";
import { mapSort } from "@/utils/shared/sort.util";
import ZoneMainCard from "./zone-main-card";
import { ZoneMain, ZoneSearch } from "@/lib/shared/zone.api";
import { ZoneMainCardSkeleton } from "../../../components/skeleton/zone/zone-main-card-skeleton";

export default function ZoneSearchCard({
  title,
  description,
  tags,
  sort,
  section,
}: ZoneSearchCardProps) {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [finalSort, setFinalSort] = useState(sort);
  const [data, setData] = useState<ZoneMainProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialLoaded, setInitialLoaded] = useState(false);

  const fetchSearch = async () => {
    setLoading(true);
    try {
      const { data } = await ZoneSearch({
        search,
        tag: selectedTag ?? "",
        sort: mapSort(finalSort),
        page: 0,
        size: 12,
      });
      setData(data);
    } catch (err) {
      console.error("검색 실패", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchInitial = async () => {
    setLoading(true);
    try {
      const data = await ZoneMain();
      setData(data);
      setInitialLoaded(true);
    } catch (err) {
      console.error("초기 모각존 불러오기 실패", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitial();
  }, []);

  useEffect(() => {
    if (initialLoaded) {
      fetchSearch();
    }
  }, [selectedTag, finalSort]);

  const toggleTag = (tag: string) => {
    setSelectedTag((prev) => (prev === tag ? null : tag));
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <SearchCardView
          title={title}
          description={description}
          tags={tags}
          section={section}
          selectedTag={selectedTag}
          onTagClick={toggleTag}
          sort={finalSort}
          onSortChange={setFinalSort}
          search={search}
          onSearchChange={setSearch}
          onSearch={fetchSearch}
        />
      </div>

      <div className="w-full max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4 mt-8">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <ZoneMainCardSkeleton key={`zone-skeleton-${i}`} />
            ))
          ) : data.length > 0 ? (
            data.map((d, i) => (
              <ZoneMainCard
                key={`zone-main-card-${d.mogakZoneId}-${i}`}
                {...d}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-border-dark dark:text-borders py-10">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
