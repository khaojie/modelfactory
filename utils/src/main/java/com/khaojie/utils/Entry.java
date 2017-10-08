package com.khaojie.utils;

import java.io.Serializable;
import java.util.Map;

public class Entry<K, V> implements Map.Entry<K,V> ,Serializable  {
	public K key;
	public V value;
	
	public Entry(K key, V value) {
		this.key = key;
		this.value = value;
	}

	public K getKey() {
		return key;
	}

	public V getValue() {
		return value;
	}

	public V setValue(V value) {
		V oldValue = this.value;
		this.value = value;
		return oldValue;
	}

}
