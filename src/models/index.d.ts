import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type MovieMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerMovie = {
  readonly id: string;
  readonly title: string;
  readonly description?: string | null;
  readonly image: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMovie = {
  readonly id: string;
  readonly title: string;
  readonly description?: string | null;
  readonly image: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Movie = LazyLoading extends LazyLoadingDisabled ? EagerMovie : LazyMovie

export declare const Movie: (new (init: ModelInit<Movie, MovieMetaData>) => Movie) & {
  copyOf(source: Movie, mutator: (draft: MutableModel<Movie, MovieMetaData>) => MutableModel<Movie, MovieMetaData> | void): Movie;
}